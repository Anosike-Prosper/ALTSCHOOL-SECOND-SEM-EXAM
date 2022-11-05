const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A blog must have a title"],
      unique: true,
      trim: true,
    },
    author: {
      type: String,
      required: [true, "A blog must have an author"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "A blog must have a description"],
      trim: true,
    },
    state: {
      type: String,
      enum: ["drafted", "published"],
      default: "drafted",
      trim: true,
    },
    body: {
      type: String,
      required: [true, "A blog must have a body"],
    },
    read_count: {
      type: Number,
      default: 0,
    },
    reading_time: String,
    tags: {
      type: [String],
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

postSchema.pre("save", async function (next) {
  //CALCULATE READING TIME

  const readTime = Math.round(this.body.split(" ").length / 200);
  this.reading_time =
    readTime < 1 ? ` <${readTime + 1} mins read` : `${readTime} mins read`;
  next();
});

module.exports = mongoose.model("Post", postSchema);
