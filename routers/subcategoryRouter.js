import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import SubCategoryModel from '../models/subCategoryModel.js'
import Category from '../models/categoryModel.js'

const subCategoryRouter = express.Router();

subCategoryRouter.get(
	'/seed',
	expressAsyncHandler(async (req, res) => {
		console.log("body ", req.body)
        const categories = await Category.find({})
        const data = ['Paints', 'Shirts', 'T-Shirts']
		for(var j=0; j<data.length; j++) {
			const subcategory = new SubCategoryModel({
				name: data[j],
				category_id: categories[0]['_id']
			});
			await subcategory.save()
		}
		res.send("sub-category seeded successfully!");
	})
);

subCategoryRouter.post(
	'/add-subcategory',
	expressAsyncHandler(async (req, res) => {
		const subcategory = new SubCategoryModel({
			...req.body
		});
		await subcategory.save()
		res.send({ msg: 'sub-category added successfully' });
	})
);

subCategoryRouter.get(
	'/get-subcategories',
	expressAsyncHandler(async (req, res) => {
		const subcategories = await SubCategoryModel.find({}).sort({ _id: -1 })
		res.send(subcategories);
	})
);

export default subCategoryRouter;
