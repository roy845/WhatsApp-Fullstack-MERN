const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const MessageGroup = require("../models/MessageGroup");
const GroupConversation = require("../models/GroupConversation");
const User = require("../models/User");

const getMessagesController = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId: conversationId })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).send(messages);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting messages",
      error,
    });
  }
};

const newMessageController = async (req, res) => {
  try {
    const newMessage = new Message(req.body);

    await newMessage.save();
    await Conversation.findByIdAndUpdate(req.body.conversationId, {
      message: req.body.text,
    });

    res.status(200).send("Message has been sent successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating message",
      error,
    });
  }
};

const getMessagesGroupController = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await MessageGroup.find({
      conversationId: conversationId,
    })
      .sort({ createdAt: -1 })
      .limit(20);

    // Get unique senderIds from the messages
    const senderIds = [
      ...new Set(messages.map((message) => String(message.senderId))),
    ];

    // Fetch all users with these sender IDs at once
    const users = await User.find({
      _id: { $in: senderIds },
    });

    // Create a mapping of userId to userName
    const userIdToNameMap = {};
    users.forEach((user) => {
      userIdToNameMap[user._id.toString()] = user.UserName;
    });

    // Add senderName to each message using the map
    const populatedMessages = messages.map((message) => {
      const augmentedMessage = message.toObject();
      augmentedMessage.senderName =
        userIdToNameMap[message.senderId.toString()];
      return augmentedMessage;
    });

    res.status(200).send(populatedMessages);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting messages",
      error,
    });
  }
};

const newMessageGroupController = async (req, res) => {
  try {
    const newMessage = new MessageGroup(req.body);

    await newMessage.save();

    // Step 1: Update the GroupConversation document
    await GroupConversation.findByIdAndUpdate(req.body.conversationId, {
      message: req.body.text,
      sender: req.body.senderId,
    });

    res.status(200).send("Message has been sent successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating message",
      error,
    });
  }
};

module.exports = {
  newMessageController,
  getMessagesController,
  getMessagesGroupController,
  newMessageGroupController,
};
