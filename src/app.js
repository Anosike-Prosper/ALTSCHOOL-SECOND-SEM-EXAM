const express = require("express");
const app = express();

require("dotenv").config();

const bodyParser = require("body-parser");

const AppError = require("../utils/appError");

const { postRouter } = require("./routers/postRouter");

const { authRouter } = require("./routers/authRouter");
const { connectToMongoDB } = require("./database/db");
const { globalError } = require("./controllers/errorController");

const PORT = process.env.PORT;

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: " WELCOME TO THE BLOG POST API",
  });
});

app.use("/user", authRouter);

app.use("/post", postRouter);

connectToMongoDB();

app.listen(PORT, () => {
  console.log(`App is listening on localhost:${PORT}`);
});

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} in the server`, 404));
});

app.use(globalError);
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

module.exports = app;
