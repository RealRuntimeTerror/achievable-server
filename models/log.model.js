const mongoose = require("mongoose");
const Activity = require("./activity.model");
const User = require("./user.model");
const Schema = mongoose.Schema;

const logSchema = new Schema(
  {
    user: { type: User, required: true },
    activity: { type: Activity, required: true },
    noHours: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Log = mongoose.model("LogSchasdfaame", logSchema);

module.exports = Log;
