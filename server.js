// Importing express
const express = require("express");

// Initialising the application invoking express
const server = express();

// Imports of third party libraries
const { v4: uuidv4 } = require('uuid');

// Set ejs as view engine
server.set("view engine", "ejs");

// Routes
server.get("/", (req, res, next) => {
  res.redirect(`/${uuidv4()}`);
});

server.get("/:room", (req, res, next) => {
  res.render("room", { roomId: req.params.room });
});

server.listen(4000);
