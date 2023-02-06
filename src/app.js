const express = require("express");

require("dotenv").config();
const app = express();

const { connectToMongoDB } = require("./database/db");
const bodyParser = require("body-parser");

const AppError = require("../utils/appError");

const { postRouter } = require("./routers/postRouter");

const authRouter = require("./routers/authRouter");

const { globalError } = require("./controllers/errorController");

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

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} in the server`, 404));
});

app.use(globalError);
connectToMongoDB();

module.exports = app;

// const app = require("./app");

// const PORT = process.env.PORT;
