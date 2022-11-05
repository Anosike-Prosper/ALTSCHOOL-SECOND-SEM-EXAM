const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "Please provide your first name!"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "Please provide last name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [8, "Password must not be less than 8 characters"],
    trim: true,
  },
});

// //A DOCUMENT MIDDLEWARE THAT HASHES USER'S PASSWORD
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// // A MIDDLEWARE TO CHECK PASSWORD
// userSchema.methods.correctPassword = async function (password) {
//   const user = this;
//   const compare = await bcrypt.compare(password, user.password);

//   return compare;
// };

module.exports = mongoose.model("User", userSchema);
