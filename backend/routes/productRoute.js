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
} from "../controllers/productController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const productRouter = express.Router();

productRouter.get("/products", getAllProducts);
productRouter.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createProduct
);
productRouter
  .put(
    "admin/product/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    updateProduct
  )
  .delete(
    "admin/product/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    deleteProduct
  );

productRouter.get("/product/:id", isAuthenticatedUser, getProductDetails);
productRouter.put("/review", isAuthenticatedUser, createProductReview);
productRouter.get("/reviews", getProductReviews);
productRouter.delete("/reviews", isAuthenticatedUser, deleteReview);

export default productRouter;
