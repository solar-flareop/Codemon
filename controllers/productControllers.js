const productModel = require("../models/productModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

// GET ALL PRODUCTS
const getAllProductsController = catchAsyncError(async (req, res, next) => {
  const products = await productModel.find({});
  res.status(200).json({ success: true, products });
});

//GET PRODUCT BY ID
const getProductByIdController = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ success: true, product });
});

//UPDATE PRICE BY ID
const UpdatePriceController = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { price } = req.body;
  if (isNaN(price)) {
    return next(new ErrorHandler("Price must be a number", 400));
  }
  const updatedProduct = await productModel.findByIdAndUpdate(
    id,
    { price },
    { new: true }
  );
  if (!updatedProduct) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ success: true, updatedProduct });
});

module.exports = {
  UpdatePriceController,
  getAllProductsController,
  getProductByIdController,
};
