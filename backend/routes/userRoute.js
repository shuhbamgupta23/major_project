import express from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUser,
  getSingleUser,
  getUserDetails,
  loginUser,
  logout,
  registerUser,
  updatePassword,
  updateProfile,
  updateRole,
} from "../controllers/userController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/password/forgot", forgotPassword);
userRouter.get("/logout", logout);
userRouter.get("/me", isAuthenticatedUser, getUserDetails);
userRouter.put("/password/update", isAuthenticatedUser, updatePassword);
userRouter.put("/me/update", isAuthenticatedUser, updateProfile);
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

export default userRouter;
