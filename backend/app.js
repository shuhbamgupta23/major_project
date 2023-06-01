import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./routes/productRoute.js";
import errorMiddleware from "./middleware/error.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

//All the routes
app.use("/", productRouter);

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
