import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';

const CMES_public_url = '/Users/rgupta/Work/project-CM/cmes/public/'

// const pridimFrontend_public_url = '../../epridim-frontend/public/'

// const heroku_public_url = '../https://epridim-frontend.herokuapp.com/public/'

const discStoragePath = CMES_public_url

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, discStoragePath + 'images/');
	},
	filename(req, file, cb) {
		cb(null, `${Date.now()}.jpg`);
	},
});

const uploadRouter = express.Router();
const upload = multer({ storage });

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
	var fileUploadUrl = req.file.path
	fileUploadUrl = fileUploadUrl.replace(discStoragePath, '')
	res.send(`/${fileUploadUrl}`);
});

export default uploadRouter;
