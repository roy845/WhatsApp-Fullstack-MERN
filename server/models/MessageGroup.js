const mongoose = require("mongoose");

const MessageGroupSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    receiverIds: {
      type: Array,
    },
    text: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MessageGroup = mongoose.model("MessageGroup", MessageGroupSchema);

module.exports = MessageGroup;
