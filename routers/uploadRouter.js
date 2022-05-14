import multer from 'multer';
import dotenv from 'dotenv';
import express from 'express';
import { isAuth } from '../utils.js';

dotenv.config();

const devStoragePath = '../epridim-frontend/public/'
// const prodStoragePath = '../https://epridim-frontend.herokuapp.com/public/'

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, devStoragePath + 'images/');
	},
	filename(req, file, cb) {
		cb(null, `${Date.now()}.jpg`);
	},
});

const uploadRouter = express.Router();
const upload = multer({ storage });

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
	var fileUploadUrl = req.file.path
	fileUploadUrl = fileUploadUrl.replace(storagePath, '')
	res.send(`/${fileUploadUrl}`);
});

export default uploadRouter;
