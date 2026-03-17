"use client"

import { useEffect } from "react";
import styles from "./page.module.css";
import { io } from "socket.io-client";

const IP = "http://192.168.99.130";
const CLIENT_PORT = 3000;
const SERVER_PORT = 4000;

export default function Home() {
    useEffect(() => {
        const socket = io(`${IP}:${SERVER_PORT}`, {
            auth: {
                token: "dashboard-secret",
                clientType: "dashboard"
            }
        });

        socket.on("connect", () => {
            console.log("Connected to server:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        socket.on("slotUpdated", (data) => {
            console.log("Slot updated:", data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <>
            AmbuStatus
        </>
    );
}
