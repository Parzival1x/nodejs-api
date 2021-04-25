const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("carts", cartSchema);
