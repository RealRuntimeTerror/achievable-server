const mongoose = require("mongoose");
const Activity = require("./activity.model");
const User = require("./user.model");
const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   name: { type: String, default: "" },
//   password: { type: String, required: true },
// });

const groupSchema = new Schema(
  {
    groupName: { type: String, required: true },
    members: [{ type: User.userSchema, default: null }], 
    activities: [{ type: String, default: null }],
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
