const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  profilePic: {
    type: String,
    default: "",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Group", GroupSchema);
