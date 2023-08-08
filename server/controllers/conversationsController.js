const Conversation = require("../models/Conversation");
const GroupConversation = require("../models/GroupConversation");

const getConversationController = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    let conversation = await Conversation.findOne({
      members: { $all: [receiverId, senderId] },
    });

    res.status(200).send(conversation);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting conversation ",
      error,
    });
  }
};

const setConversationController = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    const exists = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (exists) {
      return res.status(200).send("Conversation already exists");
    }

    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });

    await newConversation.save();

    return res.status(200).send("Conversation saved successfully!");
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in setting conversation",
      error,
    });
  }
};

const setGroupConversationController = async (req, res) => {
  try {
    const { senderId, receiverIds } = req.body; // Now expecting 'receiverIds' to be an array

    if (!Array.isArray(receiverIds)) {
      return res.status(400).send("receiverIds should be an array");
    }

    const exists = await GroupConversation.findOne({
      members: { $all: receiverIds },
    });

    if (exists) {
      return res.status(200).send("Conversation already exists");
    }

    const newConversation = new GroupConversation({
      members: receiverIds,
    });

    await newConversation.save();

    return res.status(200).send("Conversation saved successfully!");
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in setting conversation",
      error,
    });
  }
};

const getGroupConversationController = async (req, res) => {
  try {
    const { senderId, receiverIds } = req.body; // Now expecting 'receiverIds' to be an array

    if (!Array.isArray(receiverIds)) {
      return res.status(400).send("receiverIds should be an array");
    }

    let conversation = await GroupConversation.findOne({
      members: { $all: receiverIds },
    }).populate("sender");

    res.status(200).send(conversation);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting conversation",
      error,
    });
  }
};

module.exports = {
  getConversationController,
  getGroupConversationController,
  setConversationController,
  setGroupConversationController,
};
