import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/products", getAllProducts);
productRouter.post("/product/new", createProduct);
productRouter
  .put("/product/:id", updateProduct)
  .delete("/product/:id", deleteProduct)
  .get("/product/:id", getProductDetails);

export default productRouter;
