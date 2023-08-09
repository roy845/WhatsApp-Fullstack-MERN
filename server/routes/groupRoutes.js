const express = require("express");

const {
  createGroupController,
  getGroupsController,
  getGroupController,
  getUsersNotInGroupController,
  updateGroupController,
  deleteGroupController,
  leaveGroupController,
} = require("../controllers/groupsController");

const { requireSignIn } = require("../middlewares/authMiddleware");

const router = express.Router();

//createGroup || METHOD POST
router.post("/createGroup", requireSignIn, createGroupController);

//getGroups || METHOD GET
router.get("/getGroups/:userId", requireSignIn, getGroupsController);

//updateGroup || METHOD PUT
router.put("/updateGroup/:groupId", requireSignIn, updateGroupController);

//getGroup || METHOD GET
router.get("/getGroup/:groupId", requireSignIn, getGroupController);

//leaveGroup || METHOD POST
router.post(
  "/leaveGroup/:groupId/:userId",
  requireSignIn,
  leaveGroupController
);

//deleteGroup || METHOD DELETE
router.delete("/deleteGroup/:groupId", requireSignIn, deleteGroupController);

//getUsersNotInGroup || METHOD GET
router.get(
  "/getUsersNotInGroup/:groupId",
  requireSignIn,
  getUsersNotInGroupController
);

module.exports = router;
