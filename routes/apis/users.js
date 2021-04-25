const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  getAllUsers,
  getUserById,
  addUser,
  editUser,
} = require("../../controllers/user.controller");
const router = express.Router();

// @route    GET api/users
// @desc     Get All Users
router.get("/", getAllUsers);

// @route    GET api/users/:id
// @desc     Get User by ID
router.get("/:id", getUserById);

// @route    POST api/users
// @desc     Add New User
router.post(
  "/",
  [
    check("email", "Please Include a Valid Email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("username", "Username is Required").not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ errors: errors.array() });
    }
    next();
  },
  addUser
);

// @route    PATCH api/users/:id
// @desc     Edit User Details
router.patch("/:id", editUser);

module.exports = router;
