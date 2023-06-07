import express from "express";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  getUserDetails,
  loginUser,
  logout,
  registerUser,
  updateProfile,
  updateRole,
} from "../controllers/userController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logout);
userRouter.get("/me", isAuthenticatedUser, getUserDetails);

userRouter.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUser
);

userRouter.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSingleUser
);

userRouter.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateRole
);

userRouter.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteUser
);

userRouter.put("/me/update", isAuthenticatedUser, updateProfile);

export default userRouter;
