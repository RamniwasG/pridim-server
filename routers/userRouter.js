import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../new_models/UserModel.js';
import { generateToken, isAdmin, isAuth, userUpdateTemplate, mailgun } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
	'/top-sellers',
	expressAsyncHandler(async (req, res) => {
		const topSellers = await User.find({ isSeller: true, isAdmin: false }, { password: 0 })
			.sort({ 'seller.rating': -1 })
			.limit(10);
		res.send(topSellers);
	})
);

userRouter.get(
	'/all-customers',
	expressAsyncHandler(async (req, res) => {
		const allCustomers = await User.find({ isAdmin: false, isSeller: false }, { password: 0 })
			.limit(10);
		res.send(allCustomers);
	})
);

userRouter.get(
	'/seed',
	expressAsyncHandler(async (req, res) => {
		// await User.remove({});
		const createdUsers = await User.insertMany(data.users);
		res.send({ createdUsers });
	})
);

userRouter.post(
	'/signin',
	expressAsyncHandler(async (req, res) => {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				res.send({
					_id: user._id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
					isSeller: user.isSeller,
					token: generateToken(user),
				});
				return;
			}
		}
		res.status(401).send({ message: 'Invalid email or password' });
	})
);

userRouter.post(
	'/signup',
	expressAsyncHandler(async (req, res) => {
		const user = new User({
			...req.body,
			password: bcrypt.hashSync(req.body.password, 8),
		});
		const createdUser = await user.save();
		res.send({
			_id: createdUser._id,
			name: createdUser.name,
			email: createdUser.email,
			isAdmin: createdUser.isAdmin,
			isSeller: user.isSeller,
			token: generateToken(createdUser),
		});
	})
);

userRouter.get(
	'/:id',
	expressAsyncHandler(async (req, res) => {
		const user = await User.findById(req.params.id, { password: 0 });
		if (user) {
			res.send(user);
		} else {
			res.status(404).send({ message: 'User Not Found' });
		}
	})
);

userRouter.get(
	'/authUser/:id/:isSeller',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const { id, isSeller } = req.params
		const user = await User.find({ _id: id, isSeller: isSeller === 'false' ? false : true }, { password: 0 });
		if (user) {
			res.send(user[0]);
		} else {
			res.status(404).send({ message: 'User Not Found' });
		}
	})
);

userRouter.put(
	'/update-seller',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const user = await User.findById(req.user._id);
		if (user) {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;
			if (user.isSeller) {
				user.seller.name = req.body.sellerName || user.seller.name;
				user.seller.logo = req.body.sellerLogo || user.seller.logo;
				user.seller.description =
					req.body.sellerDescription || user.seller.description;
			}
			if (req.body.password) {
				user.password = bcrypt.hashSync(req.body.password, 8);
			}
			const updatedUser = await user.save();
			res.send({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
				isSeller: user.isSeller,
				token: generateToken(updatedUser),
			});
		}
	})
);

userRouter.put(
	'/update-seller/:id',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const resp = await User.findByIdAndUpdate({ _id: req.params.id }, {
			$set: { ...req.body }
		}, { new: true, useFindAndModify: false });
		console.log("result ", resp)
		res.send({ result: resp, msg: 'Seller updated successfully!' });
	})
);

userRouter.get(
	'/',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const users = await User.find({});
		res.send(users);
	})
);

userRouter.delete(
	'/:id',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const user = await User.findById(req.params.id);
		if (user) {
			if (user.email === 'admin@example.com') {
				res.status(400).send({ message: 'Can Not Delete Admin User' });
				return;
			}
			const deleteUser = await user.remove();
			res.send({ message: 'User Deleted', user: deleteUser });
		} else {
			res.status(404).send({ message: 'User Not Found' });
		}
	})
);

userRouter.put(
	'/:id',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const user = await User.findById(req.params.id);
		if (user) {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;
			user.isSeller = Boolean(req.body.isSeller);
			user.isAdmin = Boolean(req.body.isAdmin);
			// user.isAdmin = req.body.isAdmin || user.isAdmin;
			const updatedUser = await user.save();
			mailgun()
				.messages()
				.send(
					{
						from: 'Amazona <amazona@mg.yourdomain.com>',
						to: `${user.name} <${user.email}>`,
						subject: 'User update',
						html: userUpdateTemplate(user),
					},
					(error, body) => {
						if (error) {
							console.log(error);
						} else {
							console.log(body);
						}
					}
				);
			res.send({ message: 'User Updated', user: updatedUser });
		} else {
			res.status(404).send({ message: 'User Not Found' });
		}
	})
);

export default userRouter;
