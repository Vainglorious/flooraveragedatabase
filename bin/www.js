#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require("../app");
var debug = require("debug")("flooraveragedatabase:server");
var http = require("http");
const db = require("../db/models");
const { default: openseaAPICall } = require("../assets/scripts");
const dotenv = require("dotenv");
const { default: discordBot } = require("../assets/scripts/discord.bot");
const { default: getAvg } = require("../assets/scripts/getAvg");
dotenv.config();
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
db.sequelize.sync({ force: false }).then(function () {
  server.on("error", onError);
  console.log("Database created successfully.");
});
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
  console.log(`server listening on port ${port}`);
  for (let index = 0; index < 10001; index++) {
    setTimeout(() => openseaAPICall(index), index * 5000);
  }
  getAvg().then((result) => {
    discordBot(result);
  });
  setInterval(() => {
    getAvg().then((result) => discordBot(result));
  }, 60000);
}
