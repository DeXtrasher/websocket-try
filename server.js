const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: process.env.PORT || 10000 });

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

    
});

console.log(`WebSocket server is running on port ${process.env.PORT || 10000}`);
