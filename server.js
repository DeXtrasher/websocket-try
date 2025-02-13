const WebSocket = require("ws");
const express = require("express");

const app = express();
const server = app.listen(3001, () => console.log("Proxy running on port 3001"));

app.use(express.json());

const wss = new WebSocket.Server({ server });

app.get("/", (req, res) => {
    res.send("Proxy is awake!");
});

app.ws("/ws", (ws, req) => {
    const targetWs = new WebSocket("wss://creative-cookie-sprout.glitch.me", {
        headers: { "User-Agent": "MyCustomGodotClient" }
    });

    targetWs.on("open", () => console.log("Proxy connected to Glitch WebSocket"));

    targetWs.on("message", (msg) => ws.send(msg));
    ws.on("message", (msg) => targetWs.send(msg));

    targetWs.on("close", () => ws.close());
    ws.on("close", () => targetWs.close());
});
