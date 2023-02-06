const userModel = require("../src/models/userModel");
const request = require("supertest");
const app = require("../././src/app");
const mongoose = require("mongoose");
jest.setTimeout(50000);

beforeAll(async () => {
  await userModel.deleteMany({});
});
describe("/user/signup", () => {
  test(
    "POST should return 201 when a user has been created" + "/user/signup",
    async () => {
      const newUser = {
        firstname: "james",
        lastname: "mark",
        email: "jamegs@mail.com",
        password: "password",
      };

      const usersInDbBefore = await userModel.countDocuments({});
      console.log("-----------", usersInDbBefore);
      const response = await request(app)
        .post("/user/signup")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const usersInDbAfter = await userModel.countDocuments({});
      expect(usersInDbBefore).toBe(usersInDbAfter - 1);
      expect(response.body).toHaveProperty("token");
      expect(response.body.data.firstname).toBe(newUser.firstname);
      expect(response.body.data.lastname).toBe(newUser.lastname);
      expect(response.body).toHaveProperty("message");
    }
  );

  test(
    "POST should return 400 when a user tries to signup with the same email" +
      "/user/signup",
    async () => {
      const newUser = {
        firstname: "jameson",
        lastname: "marker",
        email: "jamegs@mail.com",
        password: "password",
      };

      //       //   const usersInDbBefore = await userModel.countDocuments({});
      //       //   console.log("-----------", usersInDbBefore);
      const response = await request(app)
        .post("/user/signup")
        .send(newUser)
        .expect(400);
      //       console.log(response.body);

      //       //       //   console.log(response.body);

      //       //       //   expect("Content-Type", /application\/json/);

      //       //       const usersInDbAfter = await userModel.countDocuments({});
      //       //       //   expect(usersInDbBefore).toBe(usersInDbAfter - 1);
      //       //       //   expect(response.body).toHaveProperty("token");
      //       //       //   expect(response.body.data.firstname).toBe(newUser.firstname);
      //       //       //   expect(response.body.data.lastname).toBe(newUser.lastname);
      //       //       //   expect(response.body).toHaveProperty("message");
    }
  );

  afterAll(() => {
    mongoose.connection.close();
  });
});
