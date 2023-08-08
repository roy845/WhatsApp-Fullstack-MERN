const express = require("express");

const {
  setConversationController,
  getConversationController,
  setGroupConversationController,
  getGroupConversationController,
} = require("../controllers/conversationsController");

const { requireSignIn } = require("../middlewares/authMiddleware");

const router = express.Router();

//setConversation || METHOD POST
router.post("/setConversation", requireSignIn, setConversationController);

//setGroupConversation || METHOD POST
router.post(
  "/setGroupConversation",
  requireSignIn,
  setGroupConversationController
);

//getConversation || METHOD POST
router.post("/getConversation", requireSignIn, getConversationController);

//getGroupConversation || METHOD POST
router.post(
  "/getGroupConversation",
  requireSignIn,
  getGroupConversationController
);

module.exports = router;
