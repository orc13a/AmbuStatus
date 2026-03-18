"use client"

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { io } from "socket.io-client";
import { IconCoffee, IconRoad } from "@tabler/icons-react";
import garage from "./tools/garage.js";
import isInShift from "./tools/isInShift.js";
import getElapsedTime from "./tools/getElapsedTime.js";

import AmbuStatus_garage_empty from "../public/AmbuStatus_garage_empty.svg";
import AmbuStatus_garage_home from "../public/AmbuStatus_garage_home.svg";
import Image from "next/image";

const IP = "http://192.168.8.75";
const CLIENT_PORT = 3000;
const SERVER_PORT = 4000;

export default function Home() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [garageState, setGarageState] = useState(garage);

    // Compute the 3 home slots, sorted by who has been home the longest, only include those in shift or home
    const sortedHomeUnits = garageState
        .filter(slot =>
            slot.status === "home" &&
            isInShift(currentTime, slot) &&
            slot.timestamp !== null
        )
        .sort((a, b) => a.timestamp - b.timestamp)
        .slice(0, 3);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date()); // Update the current time to force re-rendering
        }, 1000); // Update every second

        // ###############################
        // ########## Socket.io ##########
        // ###############################

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

        // ###############################

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <>
            {/* Main container for the dashboard layout */}
            <div className={styles.mainFlex}>
                {/* Container for all garage slots */}
                <div className={styles.garageMainFlex}>
                    {/* Individual garage slot display */}
                    <div className={styles.garageSlotMain}>
                        <div className={styles.garageSlotHeader}>
                            <div>
                                <b>
                                    A1
                                </b>
                            </div>
                            {isInShift(currentTime, garageState[0]) && (
                                <div className={styles.garageSlotTimer}>
                                    {getElapsedTime(garageState[0])}
                                </div>
                            )}
                        </div>
                        {/* Image representing whether an ambulance is present */}
                        <div className={!isInShift(currentTime, garageState[0]) && garageState[0].status === "home" ? styles.garageSlotMainDivImage : ""}>
                            <Image
                                loading="eager"
                                alt="Shows either an ambulance or not in a top-down view"
                                src={garageState[0].status === "away" ? AmbuStatus_garage_empty : AmbuStatus_garage_home}
                            />
                        </div>
                        {!isInShift(currentTime, garageState[0]) && garageState[0].status === "home" ? null : (
                            <div className={styles.slotExtraInfoContainer}>
                                <div className={styles.timesAwayCounter}>
                                    <div>
                                        <IconRoad stroke={2} />
                                    </div>
                                    <div>
                                        4
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Individual garage slot display */}
                    <div className={styles.garageSlotMain}>
                        <div className={styles.garageSlotHeader}>
                            <div>
                                <b>
                                    D1
                                </b>
                            </div>
                            {isInShift(currentTime, garageState[1]) && (
                                <div className={styles.garageSlotTimer}>
                                    {getElapsedTime(garageState[1])}
                                </div>
                            )}
                        </div>
                        {/* Image representing whether an ambulance is present */}
                        <div className={!isInShift(currentTime, garageState[1]) && garageState[1].status === "home" ? styles.garageSlotMainDivImage : ""}>
                            <Image
                                loading="eager"
                                alt="Shows either an ambulance or not in a top-down view"
                                src={garageState[1].status === "away" ? AmbuStatus_garage_empty : AmbuStatus_garage_home}
                            />
                        </div>
                        {!isInShift(currentTime, garageState[1]) && garageState[1].status === "home" ? null : (
                            <div className={styles.slotExtraInfoContainer}>
                                <div className={styles.timesAwayCounter}>
                                    <div>
                                        <IconRoad stroke={2} />
                                    </div>
                                    <div>
                                        1
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Individual garage slot display */}
                    <div className={styles.garageSlotMain}>
                        <div className={styles.garageSlotHeader}>
                            <div>
                                <b>
                                    DN3
                                </b>
                            </div>
                            {isInShift(currentTime, garageState[2]) && (
                                <div className={styles.garageSlotTimer}>
                                    {getElapsedTime(garageState[2])}
                                </div>
                            )}
                        </div>
                        {/* Image representing whether an ambulance is present */}
                        <div className={!isInShift(currentTime, garageState[2]) && garageState[2].status === "home" ? styles.garageSlotMainDivImage : ""}>
                            <Image
                                loading="eager"
                                alt="Shows either an ambulance or not in a top-down view"
                                src={garageState[2].status === "away" ? AmbuStatus_garage_empty : AmbuStatus_garage_home}
                            />
                        </div>
                        <div className={styles.slotExtraInfoContainer}>
                            <div className={styles.timesAwayCounter}>
                                <div>
                                    <IconRoad stroke={2} />
                                </div>
                                <div>
                                    3
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Individual garage slot display */}
                    <div className={styles.garageSlotMain}>
                        <div className={styles.garageSlotHeader}>
                            <div>
                                <b>
                                    DN2
                                </b>
                            </div>
                            {isInShift(currentTime, garageState[3]) && (
                                <div className={styles.garageSlotTimer}>
                                    {getElapsedTime(garageState[3])}
                                </div>
                            )}
                        </div>
                        {/* Image representing whether an ambulance is present */}
                        <div className={!isInShift(currentTime, garageState[3]) && garageState[3].status === "home" ? styles.garageSlotMainDivImage : ""}>
                            <Image
                                loading="eager"
                                alt="Shows either an ambulance or not in a top-down view"
                                src={garageState[3].status === "away" ? AmbuStatus_garage_empty : AmbuStatus_garage_home}
                            />
                        </div>
                        <div className={styles.slotExtraInfoContainer}>
                            <div className={styles.timesAwayCounter}>
                                <div>
                                    <IconRoad stroke={2} />
                                </div>
                                <div>
                                    2
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Individual garage slot display */}
                    <div className={styles.garageSlotMain}>
                        <div className={styles.garageSlotHeader}>
                            <div>
                                <b>
                                    DN1
                                </b>
                            </div>
                            {isInShift(currentTime, garageState[4]) && (
                                <div className={styles.garageSlotTimer}>
                                    {getElapsedTime(garageState[4])}
                                </div>
                            )}
                        </div>
                        {/* Image representing whether an ambulance is present */}
                        <div className={!isInShift(currentTime, garageState[4]) && garageState[4].status === "home" ? styles.garageSlotMainDivImage : ""}>
                            <Image
                                loading="eager"
                                alt="Shows either an ambulance or not in a top-down view"
                                src={garageState[4].status === "away" ? AmbuStatus_garage_empty : AmbuStatus_garage_home}
                            />
                        </div>
                        <div className={styles.slotExtraInfoContainer}>
                            <div className={styles.timesAwayCounter}>
                                <div>
                                    <IconRoad stroke={2} />
                                </div>
                                <div>
                                    5
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right-hand info section: date, time, next expected ambulance */}
                <div className={styles.extraInfoContainer}>
                    {/* Display current date */}
                    <div className={styles.extraInfoDate}>
                        <div>
                            {`${currentTime.getDate().toString().padStart(2, "0")}/${(currentTime.getMonth() + 1).toString().padStart(2, "0")}/${currentTime.getFullYear().toString().slice(-2)}`}
                        </div>
                    </div>
                    {/* Display current time */}
                    <div className={styles.extraInfoTime}>
                        <div>
                            {`${currentTime.getHours().toString().padStart(2, "0")}`}:{`${currentTime.getMinutes().toString().padStart(2, "0")}`}
                        </div>
                    </div>
                    {/* Display which ambulance is expected next */}
                    <div className={styles.extraInfoNextCar}>
                        {sortedHomeUnits.slice(0, 3).map((slot, index) => (
                            <div key={slot.gate}>
                                <div>
                                    #{index + 1}
                                </div>
                                <div className={styles.extraInfoNextCarText}>
                                    {slot.assignedUnit}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </>
    );
}
