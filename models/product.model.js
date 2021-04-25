const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  pricing: {
    type: Number,
  },
  shippingCost: {
    type: Number,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("products", productSchema);
