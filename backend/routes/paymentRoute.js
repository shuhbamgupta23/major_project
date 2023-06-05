import express from "express";
import {
  processPayment,
  sendStripeApiKey,
} from "../controllers/paymentController.js";
const paymentRouter = express.Router();
import { isAuthenticatedUser } from "../middleware/auth.js";


paymentRouter.get("/stripeapikey", isAuthenticatedUser, sendStripeApiKey);
paymentRouter.post("/payment/process", isAuthenticatedUser, processPayment);

export default paymentRouter;
