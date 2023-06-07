import ErrorHandler from "../utils/errorHandler.js";
import { asyncErrorHandler } from "../middleware/catchAsynError.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const registerUser = asyncErrorHandler(async (req, res, next) => {


  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is sample id",
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

export const loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

export const logout = asyncErrorHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({ success: true, message: "Logged Out" });
});

export const getUserDetails = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, user });
});

export const getAllUser = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//get Single user
export const getSingleUser = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User does not exist", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

export const updateRole = asyncErrorHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) {
    return next(new ErrorHandler("User does not exist", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//Delete User --ADMIN

export const deleteUser = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User does not exist", 404));
  }

  await user.deleteOne();
  res.status(200).json({
    success: true,
  });
});

export const updateProfile = asyncErrorHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };


  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);


    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});
