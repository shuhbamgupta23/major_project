import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} from "../controllers/productController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";



const productRouter = express.Router();

productRouter.get(
  "/products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllProducts
);
productRouter.post("/product/new", isAuthenticatedUser, createProduct);
productRouter
  .put("/product/:id", isAuthenticatedUser, updateProduct)
  .delete("/product/:id", isAuthenticatedUser, deleteProduct)
  .get("/product/:id", getProductDetails);

export default productRouter;
