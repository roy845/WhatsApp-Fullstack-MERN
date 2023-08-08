const mongoose = require("mongoose");

const GroupConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    message: {
      type: String,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const GroupConversation = mongoose.model(
  "GroupConversation",
  GroupConversationSchema
);

module.exports = GroupConversation;
