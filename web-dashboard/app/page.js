"use client"

import Image from "next/image";
import styles from "./page.module.css";

import AmbuStatus_garage_empty from "/public/AmbuStatus_garage_empty.svg";
import AmbuStatus_garage_home from "/public/AmbuStatus_garage_home.svg";
import { useEffect, useState } from "react";
import { IconCoffee, IconRoad } from "@tabler/icons-react";

export default function Dashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());

    // These objects represent the status of each garage slot, including gate, timestamp, status, and assignedUnit.
    const initialTimestamps = [
        {
            gate: "P5",
            timestamp: Date.now() - 2 * 60 * 1000, // 2 minutes ago
            status: "home",
            assignedUnit: "A1",
            shiftStart: '11:00',
            shiftEnd: '23:00',
            workInWeekends: false,
            awayCount: 0,
            breaks: {
                day: {
                    firstBreakStart: '14:00',
                    firstBreakEnd: '17:00',
                    secondBreakStart: '18:00',
                    secondBreakEnd: '21:00',
                    hadFirstBrake: false,
                    hadSecondBrake: false,
                },
                night: {
                    firstBreakStart: null,
                    firstBreakEnd: null,
                    secondBreakStart: null,
                    secondBreakEnd: null,
                    hadFirstBrake: null,
                    hadSecondBrake: null,
                }
            }
        },
        {
            gate: "P4",
            timestamp: Date.now() - 10 * 60 * 1000, // 10 minutes ago
            status: "home",
            assignedUnit: "D1",
            shiftStart: '06:00',
            shiftEnd: '18:00',
            workInWeekends: false,
            awayCount: 0,
            breaks: {
                day: {
                    firstBreakStart: '09:00',
                    firstBreakEnd: '12:00',
                    secondBreakStart: '13:00',
                    secondBreakEnd: '16:00',
                    hadFirstBrake: false,
                    hadSecondBrake: false,
                },
                night: {
                    firstBreakStart: null,
                    firstBreakEnd: null,
                    secondBreakStart: null,
                    secondBreakEnd: null,
                    hadFirstBrake: null,
                    hadSecondBrake: null,
                }
            }
        },
        {
            gate: "P3",
            timestamp: Date.now() - 15 * 60 * 1000, // 15 minutes ago
            status: "home",
            assignedUnit: "DN3",
            shiftStart: '07:00',
            shiftEnd: '19:00',
            workInWeekends: true,
            awayCount: 0,
            breaks: {
                day: {
                    firstBreakStart: '11:00',
                    firstBreakEnd: '14:00',
                    secondBreakStart: '15:30',
                    secondBreakEnd: '18:30',
                    hadFirstBrake: false,
                    hadSecondBrake: false,
                },
                night: {
                    firstBreakStart: '22:30',
                    firstBreakEnd: '01:30',
                    secondBreakStart: '02:30',
                    secondBreakEnd: '05:30',
                    hadFirstBrake: false,
                    hadSecondBrake: false,
                }
            }
        },
        {
            gate: "P2",
            timestamp: Date.now() - 25 * 60 * 1000, // 25 minutes ago
            status: "away",
            assignedUnit: "DN2",
            shiftStart: '07:00',
            shiftEnd: '19:00',
            workInWeekends: true,
            awayCount: 0,
            breaks: {
                day: {
                    firstBreakStart: '11:00',
                    firstBreakEnd: '14:00',
                    secondBreakStart: '15:30',
                    secondBreakEnd: '18:30',
                    hadFirstBrake: false,
                    hadSecondBrake: false,
                },
                night: {
                    firstBreakStart: '22:30',
                    firstBreakEnd: '01:30',
                    secondBreakStart: '02:30',
                    secondBreakEnd: '05:30',
                    hadFirstBrake: false,
                    hadSecondBrake: false,
                }
            }
        },
        {
            gate: "P1",
            timestamp: Date.now() - 30 * 60 * 1000, // 30 minutes ago
            status: "home",
            assignedUnit: "DN1",
            shiftStart: '07:00',
            shiftEnd: '19:00',
            workInWeekends: true,
            awayCount: 0,
            breaks: {
                day: {
                    firstBreakStart: '11:00',
                    firstBreakEnd: '14:00',
                    secondBreakStart: '15:30',
                    secondBreakEnd: '18:30',
                    hadFirstBrake: false,
                    hadSecondBrake: false,
                },
                night: {
                    firstBreakStart: '22:30',
                    firstBreakEnd: '01:30',
                    secondBreakStart: '02:30',
                    secondBreakEnd: '05:30',
                    hadFirstBrake: false,
                    hadSecondBrake: false,
                }
            }
        }
    ];

    const [garageTimestamps, setGarageTimestamps] = useState(initialTimestamps);

    // Helper function to determine if a unit is currently in their active shift period
    const isInShift = (slot) => {
        const now = currentTime;
        const nowMinutes = now.getHours() * 60 + now.getMinutes();
        const { shiftStart, shiftEnd, status, workInWeekends } = slot;

        const isWeekend = now.getDay() === 0 || now.getDay() === 6; // 0 = Sunday, 6 = Saturday
        if (!workInWeekends && isWeekend) {
            return false;
        }

        if (shiftStart && shiftEnd) {
            const [startHour, startMin] = shiftStart.split(":").map(Number);
            const [endHour, endMin] = shiftEnd.split(":").map(Number);
            const startTotal = startHour * 60 + startMin;
            const endTotal = endHour * 60 + endMin;

            const isIn =
                startTotal < endTotal
                    ? nowMinutes >= startTotal && nowMinutes < endTotal
                    : nowMinutes >= startTotal || nowMinutes < endTotal;

            return isIn || status === "away";
        }

        // If no shift times defined, assume always in shift
        return true;
    };

    // This function takes a garage slot object and returns how long ago the timestamp was.
    const getElapsedTime = (garageSlot) => {
        // Get the timestamp in milliseconds from the slot
        const timestampMs = garageSlot.timestamp;

        // Get the current time in milliseconds
        const now = Date.now();

        // Calculate the difference in seconds
        const diff = Math.floor((now - timestampMs) / 1000);

        // If the difference is negative, return 00:00 (timestamp in the future)
        if (diff < 0) return "00:00";

        // Calculate hours, minutes, and seconds from the total difference
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;

        // Build the time string dynamically
        const parts = [];

        // Only show hours if greater than 0
        if (hours > 0) parts.push(hours.toString());

        // Show minutes with leading zero if hours are present, or if minutes > 0
        if (minutes > 0 || hours > 0) parts.push(minutes.toString().padStart(2, '0'));

        // Always show seconds with leading zero
        parts.push(seconds.toString().padStart(2, '0'));

        // Return the formatted elapsed time as a string
        return parts.join(":");
    };

    // useEffect sets up a timer that updates currentTime every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date()); // Update the current time to force re-rendering
        }, 1000); // Update every second

        return () => clearInterval(interval); // Clean up the timer when component unmounts
    }, []);

    // Compute the 3 home slots, sorted by who has been home the longest, only include those in shift or home
    const sortedHomeUnits = garageTimestamps
        .filter(slot =>
            slot.status === "home" &&
            isInShift(slot)
        )
        .sort((a, b) => a.timestamp - b.timestamp)
        .slice(0, 3);

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
                            {isInShift(garageTimestamps[0]) && (
                                <div className={styles.garageSlotTimer}>
                                    {getElapsedTime(garageTimestamps[0])}
                                </div>
                            )}
                        </div>
                        {/* Image representing whether an ambulance is present */}
                        <div className={!isInShift(garageTimestamps[0]) && garageTimestamps[0].status === "home" ? styles.garageSlotMainDivImage : ""}>
                            <Image
                                alt="Shows either an ambulance or not in a top-down view"
                                src={garageTimestamps[0].status === "away" ? AmbuStatus_garage_empty : AmbuStatus_garage_home}
                            />
                        </div>
                        {/* <div className={styles.garageSlotTimer}>
                            {getElapsedTime(garageTimestamps[0])}
                        </div> */}
                        {!isInShift(garageTimestamps[0]) && garageTimestamps[0].status === "home" ? null : (
                            <div className={styles.slotExtraInfoContainer}>
                                <div className={styles.timesAwayCounter}>
                                    <div>
                                        <IconRoad stroke={2} />
                                    </div>
                                    <div>
                                        4
                                    </div>
                                </div>
                                <div className={styles.breakContainer}>
                                    <div>
                                        <IconCoffee stroke={2} />
                                    </div>
                                    <div>
                                        <IconCoffee stroke={2} />
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
                            {isInShift(garageTimestamps[1]) && (
                                <div className={styles.garageSlotTimer}>
                                    {getElapsedTime(garageTimestamps[1])}
                                </div>
                            )}
                        </div>
                        {/* Image representing whether an ambulance is present */}
                        <div className={!isInShift(garageTimestamps[1]) && garageTimestamps[1].status === "home" ? styles.garageSlotMainDivImage : ""}>
                            <Image
                                alt="Shows either an ambulance or not in a top-down view"
                                src={garageTimestamps[1].status === "away" ? AmbuStatus_garage_empty : AmbuStatus_garage_home}
                            />
                        </div>
                        {/* <div className={styles.garageSlotTimer}>
                            {getElapsedTime(garageTimestamps[1])}
                        </div> */}
                        {!isInShift(garageTimestamps[1]) && garageTimestamps[1].status === "home" ? null : (
                            <div className={styles.slotExtraInfoContainer}>
                                <div className={styles.timesAwayCounter}>
                                    <div>
                                        <IconRoad stroke={2} />
                                    </div>
                                    <div>
                                        1
                                    </div>
                                </div>
                                <div className={styles.breakContainer}>
                                    <div>
                                        <IconCoffee stroke={2} />
                                    </div>
                                    <div>
                                        <IconCoffee stroke={2} />
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
                            {isInShift(garageTimestamps[2]) && (
                                <div className={styles.garageSlotTimer}>
                                    {getElapsedTime(garageTimestamps[2])}
                                </div>
                            )}
                        </div>
                        {/* Image representing whether an ambulance is present */}
                        <div className={!isInShift(garageTimestamps[2]) && garageTimestamps[2].status === "home" ? styles.garageSlotMainDivImage : ""}>
                            <Image
                                alt="Shows either an ambulance or not in a top-down view"
                                src={garageTimestamps[2].status === "away" ? AmbuStatus_garage_empty : AmbuStatus_garage_home}
                            />
                        </div>
                        {/* <div className={styles.garageSlotTimer}>
                            {getElapsedTime(garageTimestamps[2])}
                        </div> */}
                        <div className={styles.slotExtraInfoContainer}>
                            <div className={styles.timesAwayCounter}>
                                <div>
                                    <IconRoad stroke={2} />
                                </div>
                                <div>
                                    3
                                </div>
                            </div>
                            <div className={styles.breakContainer}>
                                <div>
                                    <IconCoffee stroke={2} />
                                </div>
                                <div>
                                    <IconCoffee stroke={2} />
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
                            {isInShift(garageTimestamps[3]) && (
                                <div className={styles.garageSlotTimer}>
                                    {getElapsedTime(garageTimestamps[3])}
                                </div>
                            )}
                        </div>
                        {/* Image representing whether an ambulance is present */}
                        <div className={!isInShift(garageTimestamps[3]) && garageTimestamps[3].status === "home" ? styles.garageSlotMainDivImage : ""}>
                            <Image
                                alt="Shows either an ambulance or not in a top-down view"
                                src={garageTimestamps[3].status === "away" ? AmbuStatus_garage_empty : AmbuStatus_garage_home}
                            />
                        </div>
                        {/* <div className={styles.garageSlotTimer}>
                            {getElapsedTime(garageTimestamps[3])}
                        </div> */}
                        <div className={styles.slotExtraInfoContainer}>
                            <div className={styles.timesAwayCounter}>
                                <div>
                                    <IconRoad stroke={2} />
                                </div>
                                <div>
                                    2
                                </div>
                            </div>
                            <div className={styles.breakContainer}>
                                <div>
                                    <IconCoffee stroke={2} />
                                </div>
                                <div>
                                    <IconCoffee stroke={2} />
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
                            {isInShift(garageTimestamps[4]) && (
                                <div className={styles.garageSlotTimer}>
                                    {getElapsedTime(garageTimestamps[4])}
                                </div>
                            )}
                        </div>
                        {/* Image representing whether an ambulance is present */}
                        <div className={!isInShift(garageTimestamps[4]) && garageTimestamps[4].status === "home" ? styles.garageSlotMainDivImage : ""}>
                            <Image
                                alt="Shows either an ambulance or not in a top-down view"
                                src={garageTimestamps[4].status === "away" ? AmbuStatus_garage_empty : AmbuStatus_garage_home}
                            />
                        </div>
                        {/* <div className={styles.garageSlotTimer}>
                            {getElapsedTime(garageTimestamps[4])}
                        </div> */}
                        <div className={styles.slotExtraInfoContainer}>
                            <div className={styles.timesAwayCounter}>
                                <div>
                                    <IconRoad stroke={2} />
                                </div>
                                <div>
                                    5
                                </div>
                            </div>
                            <div className={styles.breakContainer}>
                                <div>
                                    <IconCoffee stroke={2} />
                                </div>
                                <div>
                                    <IconCoffee stroke={2} />
                                </div>
                            </div>
                        </div>
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
