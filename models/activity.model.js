const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    userID: {type:String, required: true},
    duration: {type: Number, default: 2}
  },
  { timestamps: true }
);

const activitySchema = new mongoose.Schema(
  {
    activityName: { type: String, required: true},
    description: { type: String },
    activityColor: {type:String, default: "blue"},
    sessions: [{type: sessionSchema, default: null}]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);

