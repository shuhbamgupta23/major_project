import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import errorMiddleware from "./middleware/error.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";
import paymentRouter from "./routes/paymentRoute.js";
import cors from "cors";

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(fileUpload());
//All the routes
app.use("/", productRouter);
app.use("/", userRouter);
app.use("/", orderRouter);
app.use("/", paymentRouter);
//middleware for error
app.use(errorMiddleware);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});
//

//Connecting to mongodb and listening to server
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to MongoDB and listening on PORT ${process.env.PORT}`
      );
    });
  } catch (err) {
    console.log(err,);
  }
})();

export default app;
