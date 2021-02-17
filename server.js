// Importing express
const express = require("express");

// Importing built in 'http'
const http = require("http");

// Initialising the application invoking express
const app = express();

// Setting up server
const server = http.createServer(app);

// Access to files in public folder
app.use(express.static("public"));

// Imports of third party libraries
const { v4: uuidv4 } = require("uuid");
const io = require("socket.io")(server);

// Set ejs as view engine
app.set("view engine", "ejs");

// Using socket.io for real time communication
io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected");
  });
});

// Routes
app.get("/", (req, res, next) => {
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res, next) => {
  res.render("room", { roomId: req.params.room });
});

// Server listens
server.listen(4000);
