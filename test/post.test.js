// const userModel = require("../src/models/userModel");
// const postModel = require("../src/models/postModel");
// const allPosts = require("./fixtures/post.json");
// const allUsers = require("./fixtures/user.json");

// module.exports = (api) =>
//   describe("posts", () => {
//     let token;

//     const login = async (email) => {
//       const response = await api.post("/user/login").send({
//         email: email,
//         password: "password1",
//       });

//       token = response.body;
//     };

//     beforeAll(async () => {
//       await userModel.deleteMany({});
//       await postModel.deleteMany({});
//       let user = null;

//       for (let i = 0; i < allUsers.length; i++) {
//         let x = await userModel.create(allUsers[i]);
//         if (i == 0) user = x;
//       }

//       for (let i = 1; i < allPosts.length; i++) {
//         await postModel.create({ owner_id: user._id, ...allPosts[i] });
//       }
//     });

//     describe("Creating a blog/post", () => {
//       const post = allPosts[0];
//       it("should work with valid token", async () => {
//         const user = "user1@mail.com";
//         await login(user);

//         const postsBefore = await postModel.count({});

//         const response = await api
//           .post("/post")
//           .set("Authorization", `Bearer ${token.token}`)
//           .send(post)
//           .expect(201)
//           .expect("Content-Type", /application\/json/);
//         expect(response.body.message).toHaveProperty("title");
//         expect(response.body.message).toHaveProperty("description");
//         expect(response.body.message).toHaveProperty("tags");
//         expect(response.body.message).toHaveProperty("author");
//         expect(response.body.message).toHaveProperty("createdAt");
//         expect(response.body.message).toHaveProperty("updatedAt");
//         expect(response.body.message).toHaveProperty("read_count");
//         expect(response.body.message).toHaveProperty("reading_time");
//         expect(response.body.message).toHaveProperty("body");
//         expect(response.body.message).toHaveProperty("state");
//         expect(response.body.message.state).toBe("drafted");

//         const postsAfter = await postModel.count({});
//         expect(postsBefore).not.toBe(postsAfter);
//       });

//       it("should return an error if no valid tokens are provided", async () => {
//         const postsBefore = await postModel.count({});

//         const response = await api.post("/post").send(post).expect(401);

//         expect(response.body.status).toBe(undefined);

//         const postsAfter = await postModel.count({});
//         expect(postsBefore).toBe(postsAfter);
//       });

//       afterAll(async () => {
//         await postModel.deleteOne({ title: post.title });
//       });
//     });

//     describe("GET request to /post", () => {
//       it("when not logged in should be able to get a list of published blogs", async () => {
//         const response = await api
//           .get("/post")
//           .expect(200)
//           .expect("Content-Type", /application\/json/);

//         const postStates = response.body.post.map((post) => post.state);
//         expect(postStates).not.toContain("drafted");
//       });

//       it("when logged in should be able to get a list of published blogs", async () => {
//         const user = "user1@mail.com";
//         await login(user);

//         const response = await api
//           .get("/post")
//           .set("Authorization", `Bearer ${token.token}`)
//           .expect(200)
//           .expect("Content-Type", /application\/json/);

//         const postStates = response.body.post.map((post) => post.state);
//         expect(postStates).not.toContain("drafted");
//       });

//       it("when requested by ID should be able to get a published blog", async () => {
//         const articleLength = allPosts.length - 1;
//         const article = allPosts[articleLength];

//         const resultPosts = await api
//           .get(`/post/${article._id}`)
//           .expect(200)
//           .expect("Content-Type", /application\/json/);

//         expect(resultPosts.body.post.title).toEqual(article.title);
//         expect(resultPosts.body.post.body).toEqual(article.body);
//         expect(resultPosts.body.post.tags).toEqual(article.tags);
//         expect(resultPosts.body.post._id).toEqual(article._id);
//       });

//       it("when requested by ID should return the author information", async () => {
//         //
//         const articleLength = allPosts.length - 1;
//         const article = allPosts[articleLength];

//         const resultPosts = await api
//           .get(`/post/${article._id}`)
//           .expect(200)
//           .expect("Content-Type", /application\/json/);

//         expect(resultPosts.body.post).toHaveProperty("owner_id");
//         expect(resultPosts.body.post.owner_id).toHaveProperty("firstname");
//         expect(resultPosts.body.post.owner_id).toHaveProperty("lastname");
//         expect(resultPosts.body.post.owner_id).toHaveProperty("email");
//       });

//       it("when requested by ID should increase the read_count by 1", async () => {
//         const articleLength = allPosts.length - 1;
//         const article = allPosts[articleLength];

//         let resultCount = await api
//           .get(`/post/${article._id}`)
//           .expect(200)
//           .expect("Content-Type", /application\/json/);

//         let count = resultCount.body.post.read_count;

//         resultCount = await api
//           .get(`/post/${article._id}`)
//           .expect(200)
//           .expect("Content-Type", /application\/json/);

//         expect(resultCount.body.post.read_count).toEqual(count + 1);
//       });
//     });
//   });
