import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import errorMiddleware from "./middleware/error.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

//All the routes
app.use("/", productRouter);
app.use("/", userRouter);
app.use("/", orderRouter);
//middleware for error
app.use(errorMiddleware);

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
    console.log(err, "errr");
  }
})();

export default app;
