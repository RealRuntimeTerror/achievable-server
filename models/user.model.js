const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    googleId: { type: String, required: true, unique: true },
    name: { type: String, default: "" },
    imageUrl: {type: String, default:""},
    groupList: [{type:String, default: null}]
  },
  {
    timestamps: true,
  }
);



const User = mongoose.model("User", userSchema);

module.exports = User;