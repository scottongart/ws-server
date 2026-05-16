const WebSocket = require('ws');

const port = process.env.PORT || 8080; // 🔥 สำคัญ
const wss = new WebSocket.Server({ port });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    store: data.store,
                    type: data.type,
                    table_no: data.table_no,
                    data: data.data
                }));
            }
        });
    });
});

console.log("WebSocket running on port", port);
