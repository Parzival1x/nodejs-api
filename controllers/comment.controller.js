const Comment = require("../models/comment.model");

exports.getAllComments = async (req, res) => {
  try {
    Comment.find((err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      }
      return res.status(200).json({ comments: data });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

exports.getCommentById = async (req, res) => {
  const _id = req.params.id;
  try {
    Comment.findOne({ _id }, (err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      }
      return res.status(200).json({ comment: data });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

exports.addComment = async (req, res) => {
  const { product, user, rating, images, text } = req.body;
  try {
    const comment = new Comment({
      product,
      user,
      rating,
      images,
      text,
    });

    comment.save((err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      }
      return res.status(200).json({ comment: data });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

exports.editComment = async (req, res) => {
  try {
    Comment.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, data) => {
        if (err) {
          return res.status(400).json({ errors: [{ msg: err }] });
        } else if (data) {
          return res.status(200).json({ comment: data });
        } else {
          return res
            .status(400)
            .json({ errors: [{ msg: "Something Went Wrong!" }] });
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};
