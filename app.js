const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cartRoutes = require("./routes/apis/carts");
const commentsRoutes = require("./routes/apis/comments");
const orderRoutes = require("./routes/apis/orders");
const productRoutes = require("./routes/apis/products");
const userRoutes = require("./routes/apis/users");

// App Config
const app = express();
dotenv.config(); // To use environment variables

// Middleware
app.use(express.json({ limit: "10mb" })); // This is used for body-parser
app.use(cors()); // This is used to enable CORS

// mongoDB Config
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

// Default Route
app.get("/", (req, res) => {
  res.status(200).json({ msg: `Server is Running` });
});

// Routes
app.use("/api/cart", cartRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Exporting Module
module.exports = app;
