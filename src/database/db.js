const mongoose = require("mongoose");
require("dotenv").config();

function getUrl() {
  const env = process.env.NODE_ENV;

  switch (env) {
    case "test":
    case "development":
      return process.env.DEV_MONGO_URL;

    case "production":
    default:
      return process.env.MONGO_URL;
  }
}
const MONGO_URL = getUrl();

function connectToMongoDB() {
  mongoose.connect(MONGO_URL);

  mongoose.connection.on("connected", () => {
    console.log("connected to MongoDb successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("An error occured", err);
  });
}

module.exports = { connectToMongoDB };
