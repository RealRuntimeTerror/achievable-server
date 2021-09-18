const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, default: "" },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

//password hashing
// userSchema.methods.generateHash = function (password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };
// userSchema.methods.validPassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
