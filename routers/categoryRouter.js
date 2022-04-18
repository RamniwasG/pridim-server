import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Category from './../models/categoryModel.js'

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

export default categoryRouter;
