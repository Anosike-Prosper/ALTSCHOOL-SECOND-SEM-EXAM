// const { validateUser } = require("../middleware/helper");
require("dotenv").config();
const userModel = require("../models/userModel");

const bcrypt = require("bcrypt");

const validator = require("express-validator");

const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  // console.log(user);
  try {
    const { firstname, lastname, email, password } = req.body;

    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        message: "This user already exist",
      });
    }

    const newUser = await userModel.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).send({
      message: "User has been succesfully signed up",
      data: newUser,
    });
  } catch (err) {
    return res.status(400).send({
      message: err,
      // message: "User has been succesfully signed up",
      // data: newUser,
    });
  }
};
//GET USER DETAILS

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      msg: "Input email or password",
    });
  }

  const user = await userModel.findOne({ email });

  // console.log(user);

  if (!user) {
    return res.status(404).json({
      status: "fail",
      msg: "User not found",
    });
  }

  const verifyPassword = await bcrypt.compare(password, user.password);

  if (!verifyPassword) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  return res.status(200).json({
    status: true,
    token: token,
  });
};

module.exports = { userSignup, userLogin };

