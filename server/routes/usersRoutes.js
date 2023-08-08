const express = require("express");

const {
  getUsersController,
  updateUserController,

  getUnblockedUsersController,
  blockUserController,
  unBlockUserController,
  getBlockedUsersController,
} = require("../controllers/usersController");

const { requireSignIn } = require("../middlewares/authMiddleware");

const router = express.Router();

//getUsers || METHOD GET
router.get("/getUsers/:userId", requireSignIn, getUsersController);

//updateUser || METHOD PUT
router.put("/updateUser/:id", requireSignIn, updateUserController);

//getUnblockedUsers || METHOD GET
router.get(
  "/getUnblockedUsers/:userId",
  requireSignIn,
  getUnblockedUsersController
);

//getBlockedUsers || METHOD GET
router.get(
  "/getBlockedUsers/:userId",
  requireSignIn,
  getBlockedUsersController
);

//blockUser || METHOD POST
router.post(
  "/blockUser/:userId/:blockedUserId",
  requireSignIn,
  blockUserController
);

//unBlockUser || METHOD POST
router.post(
  "/unBlockUser/:userId/:blockedUserId",
  requireSignIn,
  unBlockUserController
);

module.exports = router;
