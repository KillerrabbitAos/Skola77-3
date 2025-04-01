const { createServer } = require("http");
const { Server } = require("socket.io");
const next = require("next");

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

const httpServer = createServer((req, res) => {
    handle(req, res);
});

const io = new Server(httpServer, {
    path: "/api/socket_io",
    cors: { origin: "*" },
});

io.on("connection", (socket) => {
    console.log("✅ A user connected:", socket.id);

    socket.on("message", (msg) => {
        console.log("📩 Message received:", msg);
        io.emit("message", msg);
    });

    socket.on("disconnect", () => {
        console.log("❌ User disconnected:", socket.id);
    });
});

httpServer.listen(3001, () => {
    console.log("🚀 Socket.IO server running on port 3001");
});
