const Product = require("../models/product.model");

exports.getAllProducts = async (req, res) => {
  try {
    Product.find((err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      }
      return res.status(200).json({ products: data });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

exports.getProductById = async (req, res) => {
  const _id = req.params.id;
  try {
    Product.findOne({ _id }, (err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      }
      return res.status(200).json({ product: data });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

exports.addProduct = async (req, res) => {
  const { description, image, pricing, shippingCost } = req.body;

  try {
    const product = new Product({
      description,
      image,
      pricing,
      shippingCost,
    });

    product.save((err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      }
      return res.status(200).json({ product: data });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};
