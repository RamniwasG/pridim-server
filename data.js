import bcrypt from 'bcryptjs';

const data = {
  users: [
	{
	  name: 'Admin',
	  email: 'admin@example.com',
	  password: bcrypt.hashSync('1234', 8),
	  isAdmin: true,
	  isSeller: true,
	  seller: {
		name: 'Puma',
		logo: '/images/logo1.png',
		description: 'best seller',
		rating: 4.5,
		numReviews: 120,
	  },
	},
	{
	  name: 'Pridim seller 1',
	  email: 'seller1@pridim.com',
	  password: bcrypt.hashSync('1234', 8),
	  isAdmin: false,
	  isSeller: true,
	  seller: {
		name: 'Puma',
		logo: '/images/puma_seller.png',
		description: 'best seller',
		rating: 4.5,
		numReviews: 120,
	  },
	},
	{
		name: 'pridim seller 2',
		email: 'seller2@pridim.com',
		password: bcrypt.hashSync('1234', 8),
		isAdmin: false,
		isSeller: true,
		seller: {
		  name: 'Bata',
		  logo: '/images/bata_seller.png',
		  description: 'best seller',
		  rating: 4.5,
		  numReviews: 120,
		},
	  },
	{
	  name: 'Vinay',
	  email: 'vinay@example.com',
	  password: bcrypt.hashSync('1234', 8),
	  isAdmin: false,
	},
  ],
  products: [
	{
	  name: 'Nike Slim Shirt',
	  category: 'Clothing',
	  subcategory: 'Shirts',
	  image: '/images/p1.jpg',
	  price: 120,
	  countInStock: 10,
	  brand: 'Nike',
	  rating: 4.5,
	  numReviews: 10,
	  description: 'high quality product',
	},
	{
	  name: 'Adidas Fit Shirt',
	  category: 'Clothing',
	  subcategory: 'Shirts',
	  image: '/images/p2.jpg',
	  price: 100,
	  countInStock: 20,
	  brand: 'Adidas',
	  rating: 4.0,
	  numReviews: 10,
	  description: 'high quality product',
	},
	{
	  name: 'Lacoste Free Shirt',
	  category: 'Clothing',
	  subcategory: 'Shirts',
	  image: '/images/p3.jpg',
	  price: 220,
	  countInStock: 0,
	  brand: 'Lacoste',
	  rating: 4.8,
	  numReviews: 17,
	  description: 'high quality product',
	},
	{
	  name: 'Nike Slim Pant',
	  category: 'Clothing',
	  subcategory: 'Pants',
	  image: '/images/p4.jpg',
	  price: 78,
	  countInStock: 15,
	  brand: 'Nike',
	  rating: 4.5,
	  numReviews: 14,
	  description: 'high quality product',
	},
	{
	  name: 'Puma Slim Pant',
	  category: 'Clothing',
	  subcategory: 'Pants',
	  image: '/images/p5.jpg',
	  price: 65,
	  countInStock: 5,
	  brand: 'Puma',
	  rating: 4.5,
	  numReviews: 10,
	  description: 'high quality product',
	},
	{
	  name: 'Adidas Fit Pant',
	  category: 'Clothing',
	  subcategory: 'Pants',
	  image: '/images/p6.jpg',
	  price: 139,
	  countInStock: 12,
	  brand: 'Adidas',
	  rating: 4.5,
	  numReviews: 15,
	  description: 'high quality product',
	},
  ],
};
export default data;
