import express from "express";
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { logProgress, logSuccess, logWarning } from "./tools/terminalLogs.js";
import pkg from "./package.json" with { type: "json" };

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://192.168.99.152:3000",
        methods: ["GET", "POST"]
    }
});

const port = 8080;

// midelware
io.use((socket, next) => {
    const { token, clientType } = socket.handshake.auth;

    if (clientType === "dashboard" && token === "dashboard-secret") {
        socket.clientType = "dashboard";
        return next();
    }

    next(new Error("unauthorized"));
});

// Middleware to parse JSON and URL‑encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ##
// Endpoints
// ##

app.get('/', (req, res) => {
    res.send('AmbuStatus 🚑');
});

app.get('/api/status-update', (req, res) => {
    io.to("dashboard").emit("slotUpdated", { status: 'value' });
    // io.emit("slotUpdated", { status: 'value' });
    res.send('AmbuStatus 🚑 update');
});

// ##
// 
// ##

io.on('connection', (socket) => {
    logProgress(`a user connected (id: ${socket.id}, type: ${socket.clientType ?? "unknown"})`);

    if (socket.clientType === "dashboard") {
        socket.join("dashboard");
        logProgress(`socket ${socket.id} joined room: dashboard`);
    }

    socket.on('disconnect', () => {
        logWarning(`user disconnected (id: ${socket.id}, type: ${socket.clientType ?? "unknown"})`);
    });
});

server.listen(port, () => {
    logSuccess(`Server @ http://localhost:${port}\nv.${pkg.version}`);
    console.log(`\n\n`);
});