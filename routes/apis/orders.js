const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  getAllOrders,
  getOrderById,
  addOrder,
} = require("../../controllers/order.controller");
const router = express.Router();

// @route    GET api/products
// @desc     Get All Products
router.get("/", getAllOrders);

// @route    GET api/products/:id
// @desc     Get Product by ID
router.get("/:id", getOrderById);

// @route    POST api/Products
// @desc     Add New Product
router.post(
  "/",
  [
    check("products", "At least one product is required to place the order")
      .not()
      .isEmpty(),
    check("user", "User is required").not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ errors: errors.array() });
    }
    next();
  },
  addOrder
);

module.exports = router;
