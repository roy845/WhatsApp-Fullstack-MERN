const express = require("express");
const authRoutes = require("./authRoutes");
const usersRoutes = require("./usersRoutes");
const groupRoutes = require("./groupRoutes");
const messagesRoutes = require("./messagesRoutes");
const conversationsRoutes = require("./conversationsRoutes");

const router = express.Router();

router.use("/api/auth", authRoutes);
router.use("/api/users", usersRoutes);
router.use("/api/messages", messagesRoutes);
router.use("/api/conversations", conversationsRoutes);
router.use("/api/groups", groupRoutes);

module.exports = router;
