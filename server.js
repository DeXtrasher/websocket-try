const fs = require("fs"); 
const https = require("https");
const WebSocket = require("ws");
const path = require("path");

// Load SSL certificates
const server = https.createServer({
    cert: fs.readFileSync('D:/TESTING ACCELEROMETER HIT/server.crt'),
    key: fs.readFileSync('D:/TESTING ACCELEROMETER HIT/server.key'),
});

// WebSocket Server
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message); // Parse incoming JSON data
            console.log("Received:", data);

            // Broadcast the parsed data to all connected clients
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data)); // Send as a stringified JSON
                }
            });

        } catch (error) {
            console.error("Error parsing message:", error);
        }
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

// Start HTTPS + WebSocket server on port 8443
server.listen(8443, () => {
    console.log("WebSocket Server Running (HTTPS) on port 8443");
});
