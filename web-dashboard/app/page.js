"use client"

import Image from "next/image";
import styles from "./page.module.css";

import AmbuStatus_garage_empty from "/public/AmbuStatus_garage_empty.svg";
import AmbuStatus_garage_occupied from "/public/AmbuStatus_garage_occupied.svg";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());

    // These objects represent the status of each garage slot, including gate, timestamp, status, and assignedUnit.
    const initialTimestamps = [
        {
            gate: "P5",
            timestamp: Date.now() - 2 * 60 * 1000, // 2 minutes ago
            status: "occupied",
            assignedUnit: "A1",
            shiftStart: 11,
            shiftEnd: 23,
        },
        {
            gate: "P4",
            timestamp: Date.now() - 10 * 60 * 1000, // 10 minutes ago
            status: "away",
            assignedUnit: "D1",
            shiftStart: 6,
            shiftEnd: 18,
        },
        {
            gate: "P3",
            timestamp: Date.now() - 15 * 60 * 1000, // 15 minutes ago
            status: "occupied",
            assignedUnit: "DN3",
            shiftStart: null,
            shiftEnd: null,
        },
        {
            gate: "P2",
            timestamp: Date.now() - 25 * 60 * 1000, // 25 minutes ago
            status: "away",
            assignedUnit: "DN2",
            shiftStart: null,
            shiftEnd: null,
        },
        {
            gate: "P1",
            timestamp: Date.now() - 30 * 60 * 1000, // 30 minutes ago
            status: "occupied",
            assignedUnit: "DN1",
            shiftStart: null,
            shiftEnd: null,
        }
    ];

    const [garageTimestamps, setGarageTimestamps] = useState(initialTimestamps);

    // This function takes a garage slot object and returns how long ago the timestamp was.
    const getElapsedTime = (garageSlot) => {
        const timestampMs = garageSlot.timestamp;
        const now = Date.now();
        const diff = Math.floor((now - timestampMs) / 1000);

        if (diff < 0) return "00:00";

        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;

        const parts = [];
        if (hours > 0) parts.push(hours.toString());
        if (minutes > 0 || hours > 0) parts.push(minutes.toString().padStart(2, '0'));
        parts.push(seconds.toString().padStart(2, '0'));

        return parts.join(":");
    };

    // useEffect sets up a timer that updates currentTime every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date()); // Update the current time to force re-rendering
        }, 1000); // Update every second

        return () => clearInterval(interval); // Clean up the timer when component unmounts
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
                            <div className={styles.garageSlotTimer}>
                                {/* Timer showing how long the slot has been in its current state */}
                                {/* {getElapsedTime(garageTimestamps[0])} */}
                            </div>
                        </div>
                        {/* Image representing whether an ambulance is present */}
                        <div className={styles.garageSlotMainDivImage}>
                            <Image
                                alt="Shows either an ambulance or not in a top-down view"
                                src={garageTimestamps[0].status === "away" ? AmbuStatus_garage_empty : AmbuStatus_garage_occupied}
                            />
                        </div>
                        {/* <div className={styles.garageSlotTimer}>
                            {getElapsedTime(garageTimestamps[0])}
                        </div> */}
                    </div>
                    {/* Individual garage slot display */}
                    <div className={styles.garageSlotMain}>
                        <div className={styles.garageSlotHeader}>
                            <div>
                                <b>
                                    D1
                                </b>
                            </div>
                            <div className={styles.garageSlotTimer}>
                                {/* Timer showing how long the slot has been in its current state */}
                                {getElapsedTime(garageTimestamps[1])}
                            </div>
                        </div>
                        {/* Image representing whether an ambulance is present */}
                        <div>
                            <Image
                                alt="Shows either an ambulance or not in a top-down view"
                                src={garageTimestamps[1].status === "away" ? AmbuStatus_garage_empty : AmbuStatus_garage_occupied}
                            />
                        </div>
                        {/* <div className={styles.garageSlotTimer}>
                            {getElapsedTime(garageTimestamps[1])}
                        </div> */}
                    </div>
                    {/* Individual garage slot display */}
                    <div className={styles.garageSlotMain}>
                        <div className={styles.garageSlotHeader}>
                            <div>
                                <b>
                                    DN3
                                </b>
                            </div>
                            <div className={styles.garageSlotTimer}>
                                {/* Timer showing how long the slot has been in its current state */}
                                {getElapsedTime(garageTimestamps[2])}
                            </div>
                        </div>
                        {/* Image representing whether an ambulance is present */}
                        <div>
                            <Image
                                alt="Shows either an ambulance or not in a top-down view"
                                src={garageTimestamps[2].status === "away" ? AmbuStatus_garage_empty : AmbuStatus_garage_occupied}
                            />
                        </div>
                        {/* <div className={styles.garageSlotTimer}>
                            {getElapsedTime(garageTimestamps[2])}
                        </div> */}
                    </div>
                    {/* Individual garage slot display */}
                    <div className={styles.garageSlotMain}>
                        <div className={styles.garageSlotHeader}>
                            <div>
                                <b>
                                    DN2
                                </b>
                            </div>
                            <div className={styles.garageSlotTimer}>
                                {/* Timer showing how long the slot has been in its current state */}
                                {getElapsedTime(garageTimestamps[3])}
                            </div>
                        </div>
                        {/* Image representing whether an ambulance is present */}
                        <div>
                            <Image
                                alt="Shows either an ambulance or not in a top-down view"
                                src={garageTimestamps[3].status === "away" ? AmbuStatus_garage_empty : AmbuStatus_garage_occupied}
                            />
                        </div>
                        {/* <div className={styles.garageSlotTimer}>
                            {getElapsedTime(garageTimestamps[3])}
                        </div> */}
                    </div>
                    {/* Individual garage slot display */}
                    <div className={styles.garageSlotMain}>
                        <div className={styles.garageSlotHeader}>
                            <div>
                                <b>
                                    DN1
                                </b>
                            </div>
                            <div className={styles.garageSlotTimer}>
                                {/* Timer showing how long the slot has been in its current state */}
                                {getElapsedTime(garageTimestamps[4])}
                            </div>
                        </div>
                        {/* Image representing whether an ambulance is present */}
                        <div>
                            <Image
                                alt="Shows either an ambulance or not in a top-down view"
                                src={garageTimestamps[4].status === "away" ? AmbuStatus_garage_empty : AmbuStatus_garage_occupied}
                            />
                        </div>
                        {/* <div className={styles.garageSlotTimer}>
                            {getElapsedTime(garageTimestamps[4])}
                        </div> */}
                    </div>
                </div>
                {/* Right-hand info section: date, time, next expected ambulance */}
                <div className={styles.extraInfoContainer}>
                    {/* Display current date */}
                    <div className={styles.extraInfoDate}>
                        {/* <div>
                            {currentTime.toLocaleDateString("da-DK", { weekday: "long" }).charAt(0).toUpperCase() + currentTime.toLocaleDateString("da-DK", { weekday: "long" }).slice(1)}
                        </div> */}
                        <div>
                            {`${currentTime.getDate().toString().padStart(2, "0")}/${(currentTime.getMonth() + 1).toString().padStart(2, "0")}/${currentTime.getFullYear().toString().slice(-2)}`}
                        </div>
                    </div>
                    {/* Display current time */}
                    <div className={styles.extraInfoTime}>
                        <div>
                            {/* {`${currentTime.getHours().toString().padStart(2, "0")}:${currentTime.getMinutes().toString().padStart(2, "0")}:${currentTime.getSeconds().toString().padStart(2, "0")}`} */}
                            {`${currentTime.getHours().toString().padStart(2, "0")}`}:{`${currentTime.getMinutes().toString().padStart(2, "0")}`}
                        </div>
                    </div>
                    {/* Display which ambulance is expected next */}
                    <div className={styles.extraInfoNextCar}>
                        <div>
                            <div>
                                #1
                            </div>
                            <div className={styles.extraInfoNextCarText}>
                                DN2
                            </div>
                        </div>
                        <div>
                            <div>
                                #2
                            </div>
                            <div className={styles.extraInfoNextCarText}>
                                DN1
                            </div>
                        </div>
                        <div>
                            <div>
                                #3
                            </div>
                            <div className={styles.extraInfoNextCarText}>
                                DN3
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
