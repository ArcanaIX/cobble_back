const express = require("express");
const app = express();
const cors = require("cors");
const spawn = require("child_process").spawn;

const serverUtils = require("minecraft-server-util");
var minecraftServerProcess;

app.use(cors());

const port = 3000;

app.get("/", (req, res) => {
  console.log("API reached");
  res.send("API reached");
});

app.get("/start", (req, res) => {
  minecraftServerProcess = spawn("java", [
    "-Xmx9562M",
    "-Xms256M",
    "-jar",
    "server.jar",
    "nogui",
  ]);
});

app.get("/status", (req, res) => {
  serverUtils
    .status("127.0.0.1", 25565)
    .then((result) => {
      res.send(result);
    })
    .then((error) => {
      res.send(error);
    });
});

app.get("/command", (req, res) => {
  const command = req.query.command;
  minecraftServerProcess.stdin.write(command + "\n");
  res.json((message = "Command sent"));
});

app.listen(port, (req, res) => {
  console.log(`API listening on ${port}`);
});
