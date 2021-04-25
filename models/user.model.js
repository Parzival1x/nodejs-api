const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  username: {
    type: String,
  },
  purchaseHistory: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "orders",
  },
  shippingAddress: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", userSchema);
