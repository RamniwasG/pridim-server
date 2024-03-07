import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import SubCategoryModel from '../new_models/SubCategoryModel.js'
import Category from '../new_models/CategoryModel.js'
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

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

subCategoryRouter.delete(
	'/delete_subcategory/:id',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const subcategory = await SubCategoryModel.findById(req.params.id)
		if (subcategory) {
			const deletesubCategory = await subcategory.remove();
			res.send({ message: 'SubCategory deleted successfully!', subcategory: deletesubCategory });
		} else {
			res.status(404).send({ message: 'SubCategory Not Found' });
		}
	})
);

export default subCategoryRouter;
