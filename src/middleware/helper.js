const postModel = require("../models/postModel");

const protect = async (req, res, next) => {
  //PASS THE POST ID
  const { id } = req.params;
  // console.log(id);

  //GET THE ID OF THE USER MAKING THE REQUEST. PASSPORT HANDLES THIS.
  const user_id = req.user._id;
  // console.log(user_id);

  //CHECK IF THE POST IS IN THE DATABASE THROUGH THE POST ID
  const post = await postModel.findById(id);

  // console.log(post.owner_id);

  if (!post) {
    return res.status(404).json({
      status: "fail",
      message: "Post not found",
    });
  }

  // console.log(post);

  // console.log(post.owner_id);
  //TO CHECK IF THE LOGGED IN USER ID IS THE SAME AS THE USER THAT OWNS THE SAME POST OWNER ID
  if (!post.owner_id.equals(user_id)) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }
  req.state = post.state;
  // console.log(req.state);

  return next();

  // if (post.owner_id.equals(user_id)) {
  //   req.state = post.state;
  //   console.log(req.state);

  //   return next();
  // }
};

module.exports = { protect };
