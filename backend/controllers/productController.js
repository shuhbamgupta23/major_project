import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { asyncErrorHandler } from "../middleware/catchAsynError.js";
import ApiFeatures from "../utils/apiFeatures.js";

//Create Product -- Admin
export const createProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res
    .status(200)
    .json({ message: "Product created successfully", product: product });
});

//get All products
export const getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({ success: true, products, productCount });
});

//update Product -- Admin

export const updateProduct = asyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    usefindAndModify: true,
  });

  res.status(200).json({ success: true, product: product });
});

//Delete Product -- Admin

export const deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 500));
  }
  await Product.findByIdAndDelete(req.params.id);

  res
    .status(200)
    .json({ success: true, message: "Product Deleted successfully" });
});

//Get Product Details

export const getProductDetails = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({ success: true, product });
});
