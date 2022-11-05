const express = require("express");

const authRouter = express.Router();

const { validate, validateUser } = require("../middleware/validator");
const { userSignup, userLogin } = require("../controllers/authController");

authRouter.post("/signup", validateUser(), validate, userSignup);

authRouter.post("/login", userLogin);

module.exports = { authRouter };
