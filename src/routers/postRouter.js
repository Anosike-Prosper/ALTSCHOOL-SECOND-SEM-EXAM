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
  getAllPublishedPost,
  getSinglePublishedPost,
} = require("../controllers/postController");

// postRouter.get("/", authenticate.verifyUser, getAllPosts);
postRouter.get("/", getAllPublishedPost);
postRouter.get("/my-post", authenticate.verifyUser, getAllMyPost);

postRouter.patch(
  "/update-state/:id",
  authenticate.verifyUser,
  protect,
  updateState
); //WORKING

postRouter.get("/:id", getSinglePublishedPost);
postRouter.post("/", authenticate.verifyUser, createPost); //WORKING
postRouter.patch("/:id", authenticate.verifyUser, protect, updatePost); //WORKING

postRouter.delete("/:id", authenticate.verifyUser, protect, deletePost); //WORKING

module.exports = { postRouter };
