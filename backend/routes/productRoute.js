import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} from "../controllers/productController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const productRouter = express.Router();

productRouter.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createProduct
);
productRouter.get("/products", getAllProducts);
productRouter.put(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProduct
);
productRouter.delete(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProduct
);

productRouter.get("/product/:id", getProductDetails);
productRouter.put("/review", isAuthenticatedUser, createProductReview);
productRouter.get("/reviews", getProductReviews);
productRouter.delete("/reviews", isAuthenticatedUser, deleteReview);

productRouter.get(
  "/admin/products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAdminProducts
);

export default productRouter;
