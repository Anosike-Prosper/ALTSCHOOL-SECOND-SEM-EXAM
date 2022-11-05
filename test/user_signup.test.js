const mongoose = require("mongoose");
const app = require("../src/app");
const supertest = require("supertest");
const api = supertest(app);
const userModel = require("../src/models/userModel");
NODE_ENV = "test";

beforeAll(async () => {
  await userModel.deleteMany({});
});

describe("post request to api/signup", () => {
  test("with correct details successfully creates a user", async () => {
    const newUser = {
      firstname: "james",
      lastname: "mark",
      email: "jamegs@mail.com",
      password: "password",
    };

    const usersInDbBefore = await userModel.countDocuments({});
    const response = await api
      .post("/user/signup")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersInDbAfter = await userModel.countDocuments({});
    expect(usersInDbBefore).toBe(usersInDbAfter - 1);

    expect(response.body).toHaveProperty("message");
    expect(response.body.data).not.toContain("password");
    expect(response.body.data.firstName).toEqual(newUser.firstName);
  });

  test("with incorrect details returns an error", async () => {
    const newUser = {
      firstname: "james",
      lastname: "mark",
      email: "jamegs@mail.com",
      password: "password",
    };

    const usersInDbBefore = await userModel.count({});
    await supertest(app)
      .post("/user/signup")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersInDbAfter = await userModel.count({});
    expect(usersInDbBefore.length).toBe(usersInDbAfter.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
