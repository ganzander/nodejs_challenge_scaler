const WebSocket = require("ws");
const express = require("express");
const http = require("http");
const path = require("path");
const app = express();

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });
  wss.on("connection", function connection(ws) {
    console.log("WebSocket client connected");
    ws.on("message", (message) => {
      console.log("Received message:", message);
      ws.send(message);
    });
    ws.on("close", () => {
      console.log("WebSocket client disconnected");
    });
  });
  app.get("/websocket", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  server.on("request", app);
}

const server = http.createServer();
setupWebSocket(server);
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
