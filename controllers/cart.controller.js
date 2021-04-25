const Cart = require("../models/cart.model");

exports.getCartById = async (req, res) => {
  const _id = req.params.id;
  try {
    Cart.findOne({ _id }, (err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      }
      return res.status(200).json({ cart: data });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

exports.addCart = async (req, res) => {
  const { products, user } = req.body;
  try {
    const cart = new Cart({ products, user });

    cart.save((err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      }
      return res.status(200).json({ cart: data });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

exports.editCart = async (req, res) => {
  try {
    Cart.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, data) => {
        if (err) {
          return res.status(400).json({ errors: [{ msg: err }] });
        } else if (data) {
          return res.status(200).json({ cart: data });
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

exports.deleteCart = async (req, res) => {
  const _id = req.params.id;
  try {
    Cart.findOne({ _id }, (err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      }
      data.remove((err, user) => {
        if (err) {
          return res.status(400).json({ errors: [{ msg: err }] });
        }
        return res.status(200).send({ cart: user });
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};
