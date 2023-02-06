const userModel = require("../src/models/userModel");
const request = require("supertest");
const app = require("../././src/app");
const mongoose = require("mongoose");

describe("", () => {
  beforeAll(async () => {
    await userModel.deleteMany({});
    await userModel.create({
      firstname: "james",
      lastname: "mark",
      email: "jamegs@mail.com",
      password: "password",
    });
  });

  describe("", () => {
    test("is successful if user is registered in the database", async () => {
      const response = await request(app)
        .post("/user/login")
        .send({
          email: "jamegs@mail.com",
          password: "password",
        })
        .expect(200);

      console.log(response);

      expect(response.body).toHaveProperty("token");
    });

    test("returns error if incorrect details are sent", async () => {
      const response = await request(app)
        .post("/user/login")
        .send({
          email: "kate@gmail.com",
          password: "2133344",
        })
        .expect(401);

      //         expect(response.body).not.toHaveProperty("token");
    }, 10000);
  });
});

//   describe("", () => {
//     beforeAll(async () => {
//       await userModel.deleteMany({});
//       await userModel.create({
//         firstname: "james",
//         lastname: "mark",
//         email: "jamegs@mail.com",
//         password: "password",
//       });
//     });

//     describe("POST request to /user/login", () => {
//       test("is successful if user is registered in the database", async () => {
//         const response = await api
//           .post("/user/login")
//           .send({
//             email: "jamegs@mail.com",
//             password: "password",
//           })
//           .expect(200);

//         expect(response.body).toHaveProperty("token");
//       });

//       test("returns error if incorrect details are sent", async () => {
//         const response = await api
//           .post("/user/login")
//           .send({
//             email: "kate@gmail.com",
//             password: "2133344",
//           })
//           .expect(404);

//         expect(response.body).not.toHaveProperty("token");
//       });

//       test("returns error if  an empty email field  is sent", async () => {
//         const response = await api
//           .post("/user/login")
//           .send({
//             email: "",
//           })
//           .expect(400);
//       });

//       test("returns error if an empty password field  is sent", async () => {
//         const response = await api
//           .post("/user/login")
//           .send({
//             password: "",
//           })
//           .expect(400);
//       });
//     });
