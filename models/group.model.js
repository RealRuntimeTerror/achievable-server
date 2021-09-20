const mongoose = require("mongoose");
const Activity = require("./activity.model");
const User = require("./user.model");
const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    groupName: { type: String, required: true },
    members: [{ type: String, default: null }],
    activities: [{ type: String, default: null }],
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
