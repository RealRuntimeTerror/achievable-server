const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    activityName: { type: String, required: true},
    description: { type: String }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Activity", activitySchema);
