const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    userID: {type:String, required: true},
    duration: {type: Number, default: 2}
  },
  { timestamps: true }
);

const Log = mongoose.model("Session", sessionSchema);

module.exports = Log;
