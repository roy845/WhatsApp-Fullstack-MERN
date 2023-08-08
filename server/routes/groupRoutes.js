const express = require("express");

const {
  createGroupController,
  getGroupsController,
} = require("../controllers/groupsController");

const { requireSignIn } = require("../middlewares/authMiddleware");

const router = express.Router();

//createGroup || METHOD POST
router.post("/createGroup", requireSignIn, createGroupController);

//getGroups || METHOD GET
router.get("/getGroups/:userId", requireSignIn, getGroupsController);

module.exports = router;
