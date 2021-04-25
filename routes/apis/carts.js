const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  getCartById,
  addCart,
  editCart,
  deleteCart,
} = require("../../controllers/cart.controller");
const router = express.Router();

// @route    GET api/cart/:id
// @desc     Get Cart by ID
router.get("/:id", getCartById);

// @route    POST api/cart
// @desc     Add New Cart
router.post(
  "/",
  [
    check("products", "At least one product is required to add in the cart")
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
  addCart
);

// @route    PATCH api/cart/:id
// @desc     Edit Cart
router.patch("/:id", editCart);

// @route    DELETE api/cart/:id
// @desc     Delete Cart
router.delete("/:id", deleteCart);

module.exports = router;
