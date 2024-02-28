const http = require("http");
const express = require("express");
const WebSocket = require("ws");
const app = express();
const server = http.createServer(app);

function setupWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });
  const clients = new Set();

  const broadcast = (data) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };
  wss.on("connection", (ws) => {
    clients.add(ws);

    ws.on("message", (message) => {
      broadcast(message);
    });

    ws.on("close", () => {
      clients.delete(ws);
    });
  });
}
setupWebSocketServer(server);

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
