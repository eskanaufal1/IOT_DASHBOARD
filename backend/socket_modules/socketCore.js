const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`A user connected ${socket.id}`);

  socket.on("message", (data) => {
    console.log("Received message:", data);
  });

  // setInterval(() => {
  //   io.emit("time", new Date().toTimeString());
  // }, 10000);

  // socket.on("disconnect", (data) => {
  //   console.log("A user disconnected", socket.id);
  // });
});

module.exports = io;
