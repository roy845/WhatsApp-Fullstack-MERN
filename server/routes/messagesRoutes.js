const express = require("express");

const {
  getMessagesController,
  getMessagesGroupController,
  newMessageController,
  newMessageGroupController,
} = require("../controllers/messagesController");

const { requireSignIn } = require("../middlewares/authMiddleware");

const router = express.Router();

//getMessages || METHOD GET
router.get(
  "/getMessages/:conversationId",
  requireSignIn,
  getMessagesController
);

//getMessagesGroup || METHOD GET
router.get(
  "/getMessagesGroup/:conversationId",
  requireSignIn,
  getMessagesGroupController
);

//newMessage || METHOD POST
router.post("/newMessage", requireSignIn, newMessageController);

//newMessageGroup || METHOD POST
router.post("/newMessageGroup", requireSignIn, newMessageGroupController);

module.exports = router;
