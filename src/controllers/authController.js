// const { validateUser } = require("../middleware/helper");
require("dotenv").config();
const userModel = require("../models/userModel");
const AppError = require("../../utils/appError");
const { catchAsync } = require("../../utils/catchAsync");

const bcrypt = require("bcrypt");

const validator = require("express-validator");

const jwt = require("jsonwebtoken");

const createToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  return token;
};

const userSignup = catchAsync(async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  const newUser = await userModel.create({
    firstname,
    lastname,
    email,
    password,
  });

  const token = createToken(newUser._id);

  return res.status(201).send({
    message: "User has been succesfully signed up",
    token: token,
    data: newUser,
  });
});

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await userModel.findOne({ email });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or Password", 401));
  }

  const token = createToken(user.id);

  return res.status(200).json({
    status: true,
    token: token,
  });
};

module.exports = { userSignup, userLogin };

// const verifyPassword = await bcrypt.compare(password, user.password);

// if (!verifyPassword) {
//   return res.status(404).json({
//     status: "fail",
//     message: "Invalid email or password",
//   });
// }

// jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
//   expiresIn: process.env.JWT_EXPIRATION,
// });
