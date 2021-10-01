const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true }, //googleid
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


/*
email: "dulthar@gmail.com"
familyName: "Peiris"
givenName: "Dulana"
googleId: "100202007212587820480"
imageUrl: "https://lh3.googleusercontent.com/a-/AOh14Gj11P-iMSCkNcheAyQ0qOaJ06AHofPEzqfIH3U7Rig=s96-c"
name: "Dulana Peiris"

*/