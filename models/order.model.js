const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
      },
      price: {
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

module.exports = mongoose.model("orders", orderSchema);
