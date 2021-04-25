const User = require("../models/user.model");

exports.getAllUsers = async (req, res) => {
  try {
    User.find((err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      }
      return res.status(200).json({ users: data });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

exports.getUserById = async (req, res) => {
  const _id = req.params.id;
  try {
    User.findOne({ _id }, (err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      }
      return res.status(200).json({ user: data });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

exports.addUser = async (req, res) => {
  const { email, password, username, shippingAddress } = req.body;
  try {
    const isEmailExists = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (isEmailExists) {
      return res
        .status(400)
        .json({ errors: [{ msg: "The email/username is already in use" }] });
    }

    const user = new User({
      email,
      password,
      username,
      shippingAddress,
    });

    user.save((err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      }
      return res.status(200).json({ user: data });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

exports.editUser = async (req, res) => {
  try {
    User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, data) => {
        if (err) {
          return res.status(400).json({ errors: [{ msg: err }] });
        } else if (data) {
          return res.status(200).json({ user: data });
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
