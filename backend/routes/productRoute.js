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

productRouter.get("/products", getAllProducts);
productRouter.post(
  "/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createProduct
);
productRouter
  .put(
    "/product/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    updateProduct
  )
  .delete(
    "/product/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    deleteProduct
  )
  .get("/product/:id", getProductDetails);

export default productRouter;
