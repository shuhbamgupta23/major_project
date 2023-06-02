import express from "express";
import {
  forgotPassword,
  loginUser,
  logout,
  registerUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/password/forgot", forgotPassword)
userRouter.get("/logout", logout);

export default userRouter;
