const express = require("express");
const app = express();

require("dotenv").config();

const bodyParser = require("body-parser");

const { postRouter } = require("./routers/postRouter");

const { authRouter } = require("./routers/authRouter");
const { connectToMongoDB } = require("./database/db");

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
  res.status(404).json({
    status: "fail",
    message: `Cannot find ${req.originalUrl} on the server`,
  });
});

module.exports = app;
