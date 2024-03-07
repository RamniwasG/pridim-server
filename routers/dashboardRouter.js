
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../new_models/ProductModel.js';
import User from '../new_models/UserModel.js';
import Category from '../new_models/CategoryModel.js';
import SubCategory from '../new_models/SubCategoryModel.js';
import Order from '../new_models/OrderModel.js';

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
