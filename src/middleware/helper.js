const postModel = require("../models/postModel");
const AppError = require("../../utils/appError");
const { catchAsync } = require("../../utils/catchAsync");

const protect = catchAsync(async (req, res, next) => {
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
    // console.log("hello");
    return next(new AppError(`Post with ${id} not found`, 404));
    // return res.status(404).json({
    //   status: "fail",
    //   message: "Post not found",
    // });
  }

  // console.log(post);

  // console.log(post.owner_id);
  //TO CHECK IF THE LOGGED IN USER ID IS THE SAME AS THE USER THAT OWNS THE SAME POST OWNER ID
  if (!post.owner_id.equals(user_id)) {
    return next(
      new AppError(
        `User not found. Post with ${id} does not match ${user_id}`,
        404
      )
    );
    // return res.status(404).json({
    //   status: "fail",
    //   message: "User not found",
    // });
  }
  req.state = post.state;
  // console.log(req.state);

  return next();
});

module.exports = { protect };

// try {
// } catch (err) {
//   console.log("here");
//   return res.status(404).json({
//     message: err,
//   });
// }
