const mongoose = require("mongoose");
const Activity = require("./activity.model");
const User = require("./user.model");
const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    groupName: { type: String, required: true },
    members: [{ type: User, default: null }],
    activities: [{ type: Activity, default: null }],
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
