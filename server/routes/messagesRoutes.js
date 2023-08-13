const express = require("express");
const {
  sendMessageController,
  getAllMessagesController,
} = require("../controllers/messagesController");

const { requireSignIn } = require("../middlewares/authMiddleware");

const router = express.Router();

//sendMessage || METHOD POST
router.post("/sendMessage", requireSignIn, sendMessageController);

//getMessages || METHOD GET
router.get("/getAllMessages/:chatId", requireSignIn, getAllMessagesController);

module.exports = router;
