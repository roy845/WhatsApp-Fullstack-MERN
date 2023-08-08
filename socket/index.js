const { Server } = require("socket.io");

const io = new Server(9000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userData, socketId) => {
  !users.some((user) => user?._id === userData?._id) &&
    users.push({ ...userData, socketId });
  console.log(users);
};

const removeUser = (userId) => {
  users = users.filter((user) => user?._id !== userId);
  console.log(users);
};

const getUser = (userId) => {
  return users.find((user) => user._id === userId);
};

io.on("connection", (socket) => {
  console.log("user connected");

  // Join individual rooms for each conversation/group
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  // Leave a room
  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
  });

  socket.on("addUsers", (userData) => {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("removeUsers", (data) => {
    removeUser(data);
    io.emit("getUsers", users);
  });

  // Send a message to a specific room (group)
  socket.on("sendGroupMessage", (data) => {
    io.to(data?.conversationId).emit("getMessage", data);
  });

  socket.on("sendMessage", (data) => {
    const user = getUser(data?.receiverId);
    io.to(user?.socketId).emit("getMessage", data);
  });
});
