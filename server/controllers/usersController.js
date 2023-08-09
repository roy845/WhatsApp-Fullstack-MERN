const { hashPassword } = require("../helpers/authHelper");
const Message = require("../models/Message");
const User = require("../models/User");

const getUsersController = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Fetch latest messages related to the given user
    const aggregateResult = await Message.aggregate([
      {
        $match: {
          $or: [{ senderId: userId }, { receiverId: userId }],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: {
            $cond: [{ $eq: ["$senderId", userId] }, "$receiverId", "$senderId"],
          },
          latestMessageDate: { $first: "$createdAt" },
        },
      },
    ]);

    const userWithMessagesMap = {};
    aggregateResult.forEach((item) => {
      userWithMessagesMap[item._id] = item.latestMessageDate;
    });

    // Fetch all users excluding the blocked ones and current user
    const allUsers = await User.find({
      _id: { $nin: [userId, ...user.blockedUsers] },
    });

    const usersWithTimestamp = allUsers.map((u) => {
      return {
        user: u,
        latestMessageDate: userWithMessagesMap[u._id] || new Date(0), // Default to oldest date for users without messages
      };
    });

    // Sort based on the timestamp
    usersWithTimestamp.sort(
      (a, b) => b.latestMessageDate - a.latestMessageDate
    );

    const sortedUsers = usersWithTimestamp.map((u) => u.user);

    res.status(200).send(sortedUsers);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting users ordered by message date",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { updatedUser } = req.body;

    const user = await User.findById(id);

    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        FirstName: updatedUser.FirstName || user.FirstName,
        LastName: updatedUser.LastName || user.LastName,
        UserName: updatedUser.UserName || user.UserName,
        profilePic: updatedUser.profilePic === "" ? "" : updatedUser.profilePic,
        Password:
          updatedUser.Password === ""
            ? user.Password
            : await hashPassword(updatedUser.Password),
        status: updatedUser.status || user.status,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user: {
        _id: updateUser._id,
        username: updateUser.UserName,
        firstName: updateUser.FirstName,
        lastName: updateUser.LastName,
        profilePic: updateUser.profilePic,
        status: updateUser.status,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updating user",
      error,
    });
  }
};

const getUnblockedUsersController = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Find all users not in the user's blockedUsers array
    const unblockedUsers = await User.find({
      _id: { $nin: [...user.blockedUsers, userId] },
    })
      .select("-Password")
      .populate("blockedUsers");

    res.send(unblockedUsers);
  } catch (err) {
    res.status(500).send({ message: "Internal server error." });
  }
};

const blockUserController = async (req, res) => {
  try {
    const { userId, blockedUserId } = req.params;
    // Find current user by ID and add the blocked user's ID to the blockedUsers array
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { blockedUsers: blockedUserId } },
      { new: true }
    );

    // Find the blocked user by ID and add the current user's ID to their blockedUsers array
    const blockedUser = await User.findByIdAndUpdate(
      blockedUserId,
      { $addToSet: { blockedUsers: userId } },
      { new: true }
    );

    if (!user || !blockedUser) {
      return res.status(404).send({ message: "User not found." });
    }

    res.send({ message: "Users blocked each other successfully." });
  } catch (err) {
    res.status(500).send({ message: "Internal server error." });
  }
};

const getBlockedUsersController = async (req, res) => {
  try {
    const { userId } = req.params;
    // Find the user by userId and populate the blockedUsers array
    const user = await User.findById(userId).populate("blockedUsers");

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    res.send(user.blockedUsers);
  } catch (error) {
    res.status(500).send({ message: "Internal server error." });
  }
};

const unBlockUserController = async (req, res) => {
  try {
    const { userId, blockedUserId } = req.params;
    // Find current user by ID and remove the blocked user's ID from the blockedUsers array
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { blockedUsers: blockedUserId } },
      { new: true }
    );

    // Find the blocked user by ID and remove the current user's ID from their blockedUsers array
    const blockedUser = await User.findByIdAndUpdate(
      blockedUserId,
      { $pull: { blockedUsers: userId } },
      { new: true }
    );

    if (!user || !blockedUser) {
      return res.status(404).send({ message: "User not found." });
    }

    res.send({ message: "Users unblocked each other successfully." });
  } catch (err) {
    res.status(500).send({ message: "Internal server error." });
  }
};

module.exports = {
  getUsersController,
  updateUserController,
  getUnblockedUsersController,
  blockUserController,
  unBlockUserController,
  getBlockedUsersController,
};
