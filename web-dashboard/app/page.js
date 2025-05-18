"use client"

import Image from "next/image";
import styles from "./page.module.css";

import AmbuStatus_garage_empty from "/public/AmbuStatus_garage_empty.svg";
import AmbuStatus_garage_occupied from "/public/AmbuStatus_garage_occupied.svg";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());

    const initialTimestamps = [
        '2025-05-18T10:17:59.811Z',
        '2025-05-18T10:35:59.811Z',
        '2025-05-18T11:05:59.811Z',
        '2025-05-18T09:18:59.811Z',
        '2025-05-18T20:17:59.811Z',
    ];

    const [garageTimestamps, setGarageTimestamps] = useState(initialTimestamps);

    // Converts an ISO timestamp string to a human-readable elapsed time
    const getElapsedTime = (timestampStr) => {
        const parsedTimestamp = new Date(timestampStr); // Parse the string into a Date object
        const now = new Date(); // Get the current time

        if (isNaN(parsedTimestamp.getTime())) return "--:--"; // Return placeholder if invalid date

        const diff = Math.floor((now.getTime() - parsedTimestamp.getTime()) / 1000); // Difference in seconds
        if (diff < 0) return "00:00"; // Future timestamps show as 00:00

        const hours = Math.floor(diff / 3600); // Calculate full hours
        const minutes = Math.floor((diff % 3600) / 60); // Remaining minutes
        const seconds = diff % 60; // Remaining seconds

        const parts = [];
        if (hours > 0) parts.push(`${hours}`); // Include hours only if non-zero
        if (minutes > 0 || hours > 0) parts.push(minutes.toString().padStart(2, '0')); // Pad minutes
        parts.push(seconds.toString().padStart(2, '0')); // Pad seconds

        return parts.join(':'); // Format as HH:MM:SS or MM:SS
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
                                src={AmbuStatus_garage_occupied}
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
                                src={AmbuStatus_garage_occupied}
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
                                src={AmbuStatus_garage_occupied}
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
                                src={AmbuStatus_garage_empty}
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
                                src={AmbuStatus_garage_occupied}
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
