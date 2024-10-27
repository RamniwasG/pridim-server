import mongoose from 'mongoose';

const SellerSchema = new mongoose.Schema(
	{
		name: String,
        brand: String,
		logo: String,
		description: String,
		rating: { type: Number, default: 0, required: true },
		numReviews: { type: Number, default: 0, required: true },
	},
	{
		timestamps: true,
	}
);

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
        phone: { type: String },
		isAdmin: { type: Boolean, default: false },
		isSeller: { type: Boolean, default: false },
		seller: { type: SellerSchema, require: false },
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model('User', UserSchema);

export default User;
