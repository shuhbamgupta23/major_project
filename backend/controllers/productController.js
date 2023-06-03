import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { asyncErrorHandler } from "../middleware/catchAsynError.js";
import ApiFeatures from "../utils/apiFeatures.js";

//Create Product -- Admin
export const createProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  req.body.user = req.user.id;
  res
    .status(200)
    .json({ message: "Product created successfully", product: product });
});

//get All products
export const getAllProducts = asyncErrorHandler(async (req, res) => {
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

export const createProductReview = asyncErrorHandler(async (req, res) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.ratings = product.reviews.forEach((rev) => (avg += rev.rating));

  console.log(avg);
  product.ratings = avg / product.reviews.length;

  await product.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    success: true,
  });
});

export const getProductReviews = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 500));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

export const deleteReview = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 500));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toStirng()
  );

  let avg = 0;
  reviews.forEach((rev) => (avg += rev.rating));

  const ratings = avg / reviews.length;

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
