const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  getAllComments,
  getCommentById,
  addComment,
  editComment,
} = require("../../controllers/comment.controller");
const router = express.Router();

// @route    GET api/comments
// @desc     Get All Comments
router.get("/", getAllComments);

// @route    GET api/comments/:id
// @desc     Get Comment by ID
router.get("/:id", getCommentById);

// @route    POST api/comments
// @desc     Add New Comment
router.post(
  "/",
  [
    check("product", "Product ID is required").not().isEmpty(),
    check("user", "User ID is required").not().isEmpty(),
    check("rating", "Rating is Required").not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ errors: errors.array() });
    }
    next();
  },
  addComment
);

// @route    PATCH api/comments/:id
// @desc     Edit Comment
router.patch("/:id", editComment);

module.exports = router;
