import express from "express";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
import {
  deleteOrder,
  getAllOrder,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();
orderRouter.post("/order/new", isAuthenticatedUser, newOrder);
orderRouter.get("/orders/me", isAuthenticatedUser, myOrders);
orderRouter.get("/order/:id", isAuthenticatedUser, getSingleOrder);

orderRouter.get(
  "/admin/orders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllOrder
);
orderRouter.put(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateOrder
);

orderRouter.delete(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteOrder
);

export default orderRouter;
