import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import categoryRouter from './routers/categoryRouter.js';
import subcategoryRouter from './routers/subcategoryRouter.js';
import dashboardRouter from './routers/dashboardRouter.js';
import stripeRouter from './routers/stripeRouter.js';

dotenv.config();

const app = express();
app.use(morgan('dev'))
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoose.connect(process.env.MONGODB_CLOUD_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to MongoDB');
// })
// .catch((error) => {
//   console.error('Error connecting to MongoDB:', error);
// });
;
app.get('/apis', (req, res) => res.send({msg: "App is running."}));
// app.use('/api/uploads', uploadRouter);
// app.use('/api/users', userRouter);
// app.use('/api/dashboard', dashboardRouter);
// app.use('/api/products', productRouter);
// app.use('/api/orders', orderRouter);
// app.use('/api/category', categoryRouter);
// app.use('/api/subcategory', subcategoryRouter);
// app.use('/api/stripe', stripeRouter);

// app.get('/api/config/paypal', (req, res) => {
//   res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
// });
// app.get('/api/config/google', (req, res) => {
//   res.send(process.env.GOOGLE_API_KEY || '');
// });
// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// app.use(express.static(path.join(__dirname, '/new-bazzarey/build')));
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/new-bazzarey/build/index.html'))
// );

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
