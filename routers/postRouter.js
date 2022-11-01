const express = require("express");

const postRouter = express.Router();

const authenticate = require("../middleware/authentication"); // A MIDDLEWARE THAT AUTHORIZES A USER

const { protect } = require("../middleware/helper");

const {
  createPost,

  updateState,
  deletePost,
  getAllMyPost,
  updatePost,
} = require("../controllers/postController");

// postRouter.get("/", authenticate.verifyUser, getAllPosts);
// postRouter.get("/", getAllPublishedPosts);
postRouter.get("/my-post", authenticate.verifyUser, getAllMyPost);

postRouter.patch(
  "/update-state/:id",
  authenticate.verifyUser,
  protect,
  updateState
);

postRouter.post("/", authenticate.verifyUser, createPost);
postRouter.patch("/:id", authenticate.verifyUser, protect, updatePost);

postRouter.delete("/:id", authenticate.verifyUser, protect, deletePost);
// postRouter.delete("/:id", deletePost);

module.exports = { postRouter };
