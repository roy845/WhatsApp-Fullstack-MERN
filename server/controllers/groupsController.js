const Group = require("../models/Group");
const GroupConversation = require("../models/GroupConversation");
const User = require("../models/User");
const mongoose = require("mongoose");

const createGroupController = async (req, res) => {
  try {
    const { groupName, creator, usersToAdd } = req.body;

    const usersIds = usersToAdd.map((user) => user._id);

    const newGroup = new Group({
      name: groupName,
      members: usersIds,
      creator: creator,
    });

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

const getGroupController = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId)
      .populate("members", "-Password")
      .populate("creator", "-Password");

    if (!group) {
      return res.status(404).send({
        success: false,
        message: "Group not found",
      });
    }

    res.status(200).send({
      success: true,
      group,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching group",
      error,
    });
  }
};

const getUsersNotInGroupController = async (req, res) => {
  try {
    const { groupId } = req.params;

    // Fetch the group using the provided groupId
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).send({
        success: false,
        message: "Group not found",
      });
    }

    const memberIds = group.members;

    const usersNotInGroup = await User.find({
      _id: { $nin: memberIds },
    }).select("-Password");

    res.status(200).send({
      success: true,
      users: usersNotInGroup,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching users not in group",
      error,
    });
  }
};

const updateGroupController = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { groupName, profilePic, members } = req.body;

    if (!groupId) {
      return res.status(400).json({ error: "Group ID is required" });
    }

    const existingGroup = await Group.findById(groupId);

    const group = await Group.findByIdAndUpdate(
      groupId,
      {
        profilePic: profilePic || existingGroup.profilePic,
        name: groupName || existingGroup.profilePic,
        members,
      },
      { new: true }
    );

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    res.status(200).json({ group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteGroupController = async (req, res) => {
  try {
    const { groupId } = req.params;

    // First, delete all related conversations
    await GroupConversation.deleteMany({ groupId: groupId });

    // Then, delete the group itself
    const deletedGroup = await Group.findByIdAndDelete(groupId);

    // Check if the group was found and deleted
    if (!deletedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({
      message: "Group and associated conversations deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const leaveGroupController = async (req, res) => {
  try {
    const { groupId, userId } = req.params;

    // Fetch the current group to check the creator
    const currentGroup = await Group.findById(groupId);

    if (!currentGroup) {
      return res.status(404).json({ error: "Group not found" });
    }

    // If the leaving user is the creator
    if (currentGroup.creator.toString() === userId) {
      const newMembersList = currentGroup.members.filter(
        (member) => member.toString() !== userId
      );

      // If there are no other members left, delete the group and its conversations
      if (newMembersList.length === 0) {
        await Group.findByIdAndDelete(groupId);
        await GroupConversation.deleteMany({ groupId });
        return res.status(200).json({
          message:
            "Group and its conversations have been deleted as there are no members left",
        });
      }

      // Randomly select a new creator from the remaining members
      const newCreatorIndex = Math.floor(Math.random() * newMembersList.length);
      const newCreator = newMembersList[newCreatorIndex];

      // Update the group's members and set a new creator
      const updatedGroup = await Group.findByIdAndUpdate(
        groupId,
        {
          $set: { creator: newCreator },
          $pull: { members: userId },
        },
        { new: true }
      );

      return res.status(200).json({
        message: "Left group successfully and new creator assigned",
        updatedGroup,
      });
    } else {
      // If leaving user is not the creator, just remove them from members
      const updatedGroup = await Group.findByIdAndUpdate(
        groupId,
        { $pull: { members: userId } },
        { new: true }
      );

      // Check if after removing the user, the group has any members left
      if (updatedGroup.members.length === 0) {
        await Group.findByIdAndDelete(groupId);
        await GroupConversation.deleteMany({ groupId });
        return res.status(200).json({
          message:
            "Group and its conversations have been deleted as there are no members left",
        });
      }

      return res
        .status(200)
        .json({ message: "Left group successfully", updatedGroup });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createGroupController,
  getGroupsController,
  getGroupController,
  updateGroupController,
  deleteGroupController,
  getUsersNotInGroupController,
  leaveGroupController,
};
