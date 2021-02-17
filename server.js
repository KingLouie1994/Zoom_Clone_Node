// Importing express
const express = require("express");

// Initialising the application invoking express
const server = express();

// Routes
server.get("/", (req, res, next) => {
  res.status(200).send("Hello from Zoom Clone");
});

server.listen(4000);
