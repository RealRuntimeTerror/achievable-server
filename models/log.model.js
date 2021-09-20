const mongoose = require("mongoose");
const Activity = require("./activity.model");
const User = require("./user.model");
const Schema = mongoose.Schema;

const logSchema = new Schema(
  {
    user: { type: String, required: true },
    activity: { type: String, required: true },
    noHours: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Log = mongoose.model("LogSchasdfaame", logSchema);

module.exports = Log;
