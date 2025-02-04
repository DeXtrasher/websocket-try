const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: process.env.PORT || 10000 });

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
        console.log("Received:", message);
    });

    ws.send("Welcome to the WebSocket server!");
});

console.log(`WebSocket server is running on port ${process.env.PORT || 10000}`);
