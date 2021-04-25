const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  getAllProducts,
  getProductById,
  addProduct,
} = require("../../controllers/product.controller");
const router = express.Router();

// @route    GET api/products
// @desc     Get All Products
router.get("/", getAllProducts);

// @route    GET api/products/:id
// @desc     Get Product by ID
router.get("/:id", getProductById);

// @route    POST api/Products
// @desc     Add New Product
router.post(
  "/",
  [
    check("description", "Description is required").not().isEmpty(),
    check("pricing", "Pricing is required").not().isEmpty(),
    check("shippingCost", "Shipping Cost is Required").not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ errors: errors.array() });
    }
    next();
  },
  addProduct
);

module.exports = router;
