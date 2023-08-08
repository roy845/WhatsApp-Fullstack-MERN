const Group = require("../models/Group");
const mongoose = require("mongoose");

const createGroupController = async (req, res) => {
  try {
    const { groupName, usersToAdd } = req.body;

    const usersIds = usersToAdd.map((user) => user._id);

    const newGroup = new Group({ name: groupName, members: usersIds });

    await newGroup.save();

    res.status(200).send("Group created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

const getGroupsController = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const userGroups = await Group.find({ members: userId }).populate(
      "members"
    );

    res.status(200).send({
      success: true,
      groups: userGroups,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching groups",
      error,
    });
  }
};

module.exports = {
  createGroupController,
  getGroupsController,
};
