const express = require("express");

const authRouter = express.Router();

const { validate, validateUser } = require("../middleware/validator");
const { userSignup, loginController } = require("../controllers/authController");

authRouter.post("/signup", validateUser(), validate, userSignup);

authRouter.post("/login", loginController);

module.exports = { authRouter };
