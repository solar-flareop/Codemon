const productModel = require("../models/productModel");
const sample_data = require("../data.json");
const catchAsyncError = require("../middlewares/catchAsyncError");

//ADD ALL Products
const addDataController = catchAsyncError(async (req, res, next) => {
  await productModel.insertMany(sample_data);
  res.status(201).json({ success: true, message: "All product data posted" });
});

module.exports = addDataController;
