// Importing express
const express = require("express");

// Initialising the application invoking express
const server = express();

// Set ejs as view engine
server.set("view engine", "ejs");

// Routes
server.get("/", (req, res, next) => {
  res.render('room')
});

server.listen(4000);
