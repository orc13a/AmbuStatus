import express from "express";
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { logProgress, logSuccess, logWarning } from "./tools/terminalLogs.js";
import pkg from "./package.json" with { type: "json" };
import { updateState } from "./tools/updateState.js";

const IP = "http://192.168.99.130";
const CLIENT_PORT = 3000;
const SERVER_PORT = 4000;

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: `${IP}:${CLIENT_PORT}`,
        methods: ["GET", "POST"]
    }
});

const port = SERVER_PORT;

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

app.post("/api/status-update", (req, res) => {
    const { sensorId, status } = req.body;

    const updated = updateState(sensorId, status);

    if (updated) {
        io.to("dashboard").emit("slotUpdated", updated);
    }

    res.sendStatus(200);
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
    logSuccess(`Server @ ${IP}:${port}\nv.${pkg.version}`);
    console.log(`\n\n`);
});