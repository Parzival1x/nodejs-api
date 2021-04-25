const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  rating: {
    type: Number,
  },
  images: {
    type: [String],
  },
  text: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("comments", commentSchema);
