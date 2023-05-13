const express = require("express");
const addDataController = require("../controllers/addDataControllers");
const {
  getAllProductsController,
  getProductByIdController,
  UpdatePriceController,
} = require("../controllers/productControllers");

const router = express.Router();

//ADD ALL PRODUCT DATA
router.post("/products", addDataController);

// GET ALL PRODUCTS
router.get("/products", getAllProductsController);

//GET PRODUCT BY ID
router.get("/product/:id", getProductByIdController);

//UPDATE PRICE BY ID
router.put("/product/:id", UpdatePriceController);

// export default router;
module.exports = router;
