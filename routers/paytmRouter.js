import express from 'express'
import dotenv from 'dotenv'
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js';
import PaytmCheckSum from 'paytmchecksum'

dotenv.config()

const stripeM = stripe(process.env.STRIPE_SECRET_KEY)

const paytmRouter = express.Router();

paytmRouter.post(
    "/paytm/paynow",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        console.log("body ", JSON.stringify(req.body))
        var params = {}
        
        var paytmChecksum = PaytmCheckSum.generateSignature()(params, "YOUR_MERCHANT_KEY");
        paytmChecksum.then(function(result){
            console.log("generateSignature Returns: " + result);
        }).catch(function(error){
            console.log(error);
        });
        // stripeM.customers.create({
        //     email: req.body.stripeEmail,
        //     source: req.body.stripeToken,
        //     name: req.body.name,
        //     address: {
        //         line1: 'Jargon, ruhipur ghazipur',
        //         postal_code: '233300',
        //         city: 'ghazipur',
        //         state: 'uttar-pradesh',
        //         country: 'india'
        //     }
        // })
        // .then((customer) => {
        //     console.log("created customer " + customer)
        //     return stripeM.charges.create({
        //         amount: req.body.amount,
        //         discriptipn: req.body.description,
        //         currency: 'INR',
        //         customer
        //     })
        // })
        // .then((charge) => {
        //     console.log("charge " + charge)
        //     console.log(charge)
        //     res.send('Success')
        // })
    })
)

export default paytmRouter;
