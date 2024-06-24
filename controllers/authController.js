require('dotenv').config();
const User = require("../models/FormData");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth = require("../middlewares/authMiddleware");


const generateAccessToken = async (user) => {
  const token = jwt.sign({ userId: user._id },process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: "2h",
  });

  return token;
};

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Error",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    const userData = await User.findOne({ email });

    if (!userData) {
      return res.status(400).json({
        success: false,
        msg: "Email & Password are incorrect",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, userData.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        msg: "Email & Password are incorrect",
      });
    }

    const accessToken = await generateAccessToken(userData);
    return res.status(200).json({
      success: true,
      msg: "Login successful",
      accessToken: accessToken,
      tokenType: "Bearer",
      data: userData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports = {
 
  loginUser,
};
