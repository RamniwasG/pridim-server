
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import Category from '../models/categoryModel.js';
import SubCategory from '../models/subCategoryModel.js';
import Order from '../models/orderModel.js';

const dashboardRouter = express.Router();

dashboardRouter.get(
	'/getData',
	expressAsyncHandler(async (req, res) => {
		const categoriesCount = await Category.find({}).count();
		const subCategoriesCount = await SubCategory.find({}).count();
		const productsCount = await Product.find({}).count();
		const topSellersCount = await User.find({ isSeller: true, isAdmin: false }).count()
		const customersCount = await User.find({ isAdmin: false, isSeller: false }).count()
		const ordersCount = await Order.find({}).count()
		const database = { name: process.env.DB_NAME };
		const resp = {
			categoriesCount,
			subCategoriesCount,
			productsCount,
			topSellersCount,
			customersCount,
			ordersCount,
			database
		}
		res.send(resp);
	})
);

export default dashboardRouter;
