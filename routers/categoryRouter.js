import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Category from './../models/categoryModel.js'
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const categoryRouter = express.Router();

categoryRouter.get(
	'/seed',
	expressAsyncHandler(async (req, res) => {
		const data = [ {name: 'Clothing'}, {name: 'Shoes'}, {name:'Sports'}]
		for(var i = 0; i < data.length; i++) {
			const category = new Category({
				name: data[i].name
			});
			await category.save()
		}
		res.send("category seeded successfully!");
	})
);

categoryRouter.post(
	'/add-category',
	expressAsyncHandler(async (req, res) => {
		const category = new Category({
			name: req.body.name
		});
		const resp = await category.save();
		res.send({ msg: 'category added successfully' });
	})
);

categoryRouter.get(
	'/get-categories',
	expressAsyncHandler(async (req, res) => {
		const categories = await Category.find({}).sort({ _id: -1 })
		res.send(categories);
	})
);

categoryRouter.delete(
	'/deleteCategory/:id',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const category = await Category.findById(req.params.id)
		if (category) {
			const deleteCategory = await category.remove();
			res.send({ message: 'Category deleted successfully!', category: deleteCategory });
		} else {
			res.status(404).send({ message: 'Category Not Found' });
		}
	})
);

categoryRouter.put(
	'/edit-category/:id',
	isAuth,
	isSellerOrAdmin,
	expressAsyncHandler(async (req, res) => {
		const categoryId = req.params.id;
		const category = await Category.findById(categoryId);
		if (category) {
			category.name = req.body.name;
			const updatedCategory = await category.save();
			res.send({ msg: 'Category updated successfully!', category: updatedCategory });
		} else {
			res.status(404).send({ message: 'Category Not Found' });
		}
	})
);

export default categoryRouter;
