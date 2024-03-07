import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  	{
		name: { type: String, required: true },
		comment: { type: String, required: true },
		rating: { type: Number, required: true },
  	},
  	{
		timestamps: true,
  	}
);

const ProductDetailSchema = new mongoose.Schema(
	{
		materialType: { type: String, required: false },
		sleeveType: { type: String, required: false },
		length: { type: String, required: false },
		neckStyle: { type: String, required: false },
		style: { type: String, required: false },
		countryOfOrigin: { type: String, required: false }
	}
);

const AboutProductSchema = mongoose.Schema(
	{
		type: String, required: false
	}
)

const ProductSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		image: { type: String, required: true },
		brand: { type: String, required: true },
		category: { type: String, required: true },
		subcategory: { type: String, required: true },
		details: { type: ProductDetailSchema, required: false },
		about: { type: [AboutProductSchema], required: false },
		additionalInformation: { type: [AboutProductSchema], required: false },
		colors: [{ type: String, required: true }],
		size: [{ type: String, required: true }],
		availableInLocations: [{ type: String, required: true }],
		price: { type: Number, required: true },
		countInStock: { type: Number, required: true },
		rating: { type: Number, default: 0, required: true },
		numReviews: { type: Number, default: 0, required: true },
		reviews: [ReviewSchema],
		seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
  	},
  	{
		timestamps: true,
  	}
);
const Product = mongoose.model('Product', ProductSchema);

export default Product;
