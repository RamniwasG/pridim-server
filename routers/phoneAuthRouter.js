import dotenv from 'dotenv'
dotenv.config();

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express')
const expressAsyncHandler = require('express-async-handler');
const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)

const phoneAuthRouter = express.Router();

phoneAuthRouter.post('/',
    expressAsyncHandler(async (req, res) => {
        console.log("body ", req.body)
        const v_code = Math.floor(100000 + Math.random() * 900000);
        console.log("v code ", v_code)
        client
        .messages
        .create({
            body: 'Welcome to ePridim, your verification code is ' + v_code,
            to: `+${req.body.phone}`
        })
        .then(data => {
            res.status(200).send(data)
        }).catch((err) => {
            res.send(err);
        })
    })
)

phoneAuthRouter.post('/verify',
    expressAsyncHandler(async (req, res) => {
        client
        .verify
        .services(process.env.SERVICE_ID)
        .verificationChecks
        .create({
            to: `+${req.body.phone}`,
            code: req.body.code
        })
        .then(data => {
            res.status(200).send(data)
        })
    })
)

export default phoneAuthRouter;
