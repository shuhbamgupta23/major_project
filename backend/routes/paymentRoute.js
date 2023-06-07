import express from "express";
import { isAuthenticatedUser } from "./../middleware/auth.js";
import { processPayment, sendStripeApiKey } from "./../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/payment/process", isAuthenticatedUser, processPayment);
paymentRouter.get("/stripeapikey",  processPayment);


export default paymentRouter;
