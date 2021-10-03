const mongoose = require("mongoose");
const Activity = require("./activity.model");
const User = require("./user.model");
const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    userID: {type:String, required: true},
    duration: {type: Number, default: 2}
  },
  { timestamps: true }
);

module.exports = sessionSchema;

const activitySchema = new Schema(
  {
    activityName: { type: String, required: true},
    description: { type: String },
    activityColor: {type:String, default: "blue"},
    sessions: [{type: sessionSchema, default: null}]
    //,sessions: [{type: Schema.Types.ObjectId, ref: 'session'}]
  },
  { timestamps: true }
);

module.exports = activitySchema;

const groupSchema = new Schema(
  {
    groupName: { type: String, required: true },
    adminId: {type: String, required: true},
    activities: [{type:activitySchema, default: null}],
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
