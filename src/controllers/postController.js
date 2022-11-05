const postModel = require("../models/postModel");

const createPost = async (req, res) => {
  try {
    const { title, author, description, tags, body } = req.body;

    // GET THE USER ID FROM THE REQUEST BODY WHEN THE USER HAS SUCCESSFULLY LOGGED IN. PASSPORT HANDLES THIS BY DEFAULT
    const owner_id = req.user._id;

    // console.log("this is the owner id", owner_id);
    // console.log(req.user);

    const newPost = await postModel.create({
      title,
      author,
      description,
      tags,
      body,
      owner_id,
    });

    res.status(201).json({
      status: "success",
      message: newPost,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

const updateState = async (req, res) => {
  // console.log(req.body);
  // console.log(req.params.id);
  const { id } = req.params;

  //USER PASSES THE STATE HE WANTS TO UPDATE IT TO
  const userState = req.body.state;
  // console.log(userState);

  // THE STATE THAT WAS GOTTEN IN THE PROTECT MIDDLEWARE
  const postState = req.state;
  // console.log(postState);

  //IF THE STATE OF THE POST IS NOT ALREADY IN PUBLISHED, UPDATE THE STATE TO PUBLISHED
  if (postState !== userState) {
    const post = await postModel.findByIdAndUpdate(
      id,
      { $set: { state: userState } },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      status: "Success",
      post: post,
    });
  }

  //IF THE POST STATE IS ALREADY IN PUBLISHED, THEN THERE IS NO NEED TO UPDATE IT
  return res
    .status(400)
    .json({ message: "Post is already in published state" });
};

const deletePost = async (req, res) => {
  //GETS THE POST ID
  const { id } = req.params;

  //GETS THE USER ID FROM THE RWQUEST
  const user_id = req.user._id;

  //DELETE THE POST WITH THE POST ID PASSED AND THE POST SHOULD ALSO BELONG TO THE USER IN THE REQUEST BODY

  const post = await postModel.findOneAndDelete({ _id: id, owner_id: user_id });

  return res.status(200).json({
    status: "success",
    msg: "Post has been successfully deleted",
  });
};

const getAllMyPost = async (req, res) => {
  try {
    //GET THE USER ID WHEN HE LOGS IN
    const user_id = req.user.id;

    // BUILD THE QUERY
    const objectToQuery = { ...req.query };

    //THIS EXCLUDES THE FIELDS IF THE USER PASSES THEM IN
    const excludeFields = ["page", "limit", "state"];
    excludeFields.forEach((el) => delete objectToQuery[el]);

    // ADD THE USER_ID INTO THE QUERY OBJECT
    objectToQuery.owner_id = user_id;

    if (req.query.state) {
      objectToQuery.state = req.query.state;
    }

    //PAGINATE
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    // EXECUTE THE QUERY
    let query = postModel.find(objectToQuery).skip(skip).limit(limit);

    const userPost = await query;

    res.status(200).json({
      status: "success",
      data: {
        userPost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "An error occured. ",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const postBodyToUpdate = req.body;

    console.log(postBodyToUpdate);

    const post = await postModel.findByIdAndUpdate(id, postBodyToUpdate, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: "update successful",
      post: post,
    });
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      message: "Post not found",
    });
  }
};

const getAllPublishedPost = async (req, res) => {
  let objectToQuery = { ...req.query };

  //EXCLUDES THE FOLLOWING FIELDS INCASE THE USER PASSES THEM

  const excludeFields = [
    "page",
    "filter",
    "limit",
    "sort",
    "state",
    "author",
    "title",
    "tags",
  ];
  excludeFields.forEach((el) => delete objectToQuery[el]);

  console.log(objectToQuery);

  objectToQuery.state = "published";

  console.log(objectToQuery);

  // WE WANT TO FILTER BY AUTHOR, TITLE, TAGS

  if (req.query.author) {
    objectToQuery.author = req.query.author;
  }

  if (req.query.tags) {
    objectToQuery.tags = req.query.tags;
  }

  if (req.query.title) {
    objectToQuery.title = req.query.title;
  }

  let query = postModel.find(objectToQuery);

  console.log(objectToQuery);
  // WE WANT TO SORT BY READ COUNT, READ TIME, TIME STAMP

  if (req.query.sort) {
    console.log(req.query.sort);
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  }

  //
  //PAGINATE
  //PAGINATE
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 20;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  const post = await query;

  return res.status(200).json({
    status: "success",
    post: post,
  });

  //
  //   // WE ALSO WANT A DEFAULT OF 20 PAGES

  //   // console.log(allPublishedPosts);
};

const getSinglePublishedPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postModel
      .findById(id)
      .where("state")
      .equals("published")
      .populate("owner_id");

    post.read_count = post.read_count += 1;
    await post.save();

    console.log(post);

    return res.status(200).json({
      status: "success",
      post: post,
    });
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      message: "Post not found",
    });
  }
};

module.exports = {
  createPost,
  updateState,
  deletePost,
  getAllMyPost,
  updatePost,
  getAllPublishedPost,
  getSinglePublishedPost,
};
