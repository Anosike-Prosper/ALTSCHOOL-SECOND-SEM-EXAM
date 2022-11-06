const mongoose = require("mongoose");
const posts = require("./post.test.js");
const login = require("./user_login.test.js");
const signup = require("./user_signup.test.js");
const app = require("../src/app");
const supertest = require("supertest");
const api = supertest(app);

describe("tests", () => {
  login(api);
  signup(api);
  posts(api);
});

afterAll(() => {
  mongoose.connection.close();
});
