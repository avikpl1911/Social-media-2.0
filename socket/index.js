const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors =  require("cors");



const app = express();



const server = http.createServer(app)

app.use(cors());

const io = socketio(server, {
  cors: {
    origin: "https://social-media-2-avikpl1911.vercel.app",
    methods: ["GET", "POST"]
  }
});
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    const userExists = users.some(user => user.userId === userId)
    if (userExists) {
        users = users.filter(user => user.userId !== userId)
        users.push({ userId, socketId })
    } else users.push({ userId, socketId })

}


  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
  
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });


  server.listen(8900 || process.env.PORT,()=>console.log("server has started"));