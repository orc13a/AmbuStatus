"use client"

import Image from "next/image";
import styles from "./page.module.css";

import AmbuStatus_garage_empty from "/public/AmbuStatus_garage_empty.svg";
import AmbuStatus_garage_occupied from "/public/AmbuStatus_garage_occupied.svg";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());

    const initialTimestamps = [
        new Date(Date.now() - 865000),  // example: 14:25 ago
        new Date(Date.now() - 2700000), // example: 45:00 ago
        new Date(Date.now() - 1265000), // example: 21:05 ago
        new Date(Date.now() - 553000),  // example: 9:13 ago
        new Date(Date.now() - 3845000), // example: 1:04:05 ago
    ];

    const [garageTimestamps, setGarageTimestamps] = useState(initialTimestamps);

    const getElapsedTime = (timestamp) => {
        const now = new Date();
        const diff = Math.floor((now - timestamp) / 1000);
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;

        const parts = [];
        if (hours > 0) parts.push(`${hours}`);
        if (minutes > 0 || hours > 0) parts.push(minutes.toString().padStart(2, '0'));
        parts.push(seconds.toString().padStart(2, '0'));

        return parts.join(':');
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className={styles.mainFlex}>
                <div className={styles.garageMainFlex}>
                    {/* Each div for each garageslot - use svgs */}
                    <div className={styles.garageSlotMain}>
                        {/* <div>
                            <b>
                                A1
                            </b>
                        </div> */}
                        <div className={styles.garageSlotHeader}>
                            <div>
                                <b>
                                    A1
                                </b>
                            </div>
                            <div className={styles.garageSlotTimer}>
                                {/* {getElapsedTime(garageTimestamps[0])} */}
                            </div>
                        </div>
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
                    <div className={styles.garageSlotMain}>
                        <div className={styles.garageSlotHeader}>
                            <div>
                                <b>
                                    D1
                                </b>
                            </div>
                            <div className={styles.garageSlotTimer}>
                                {getElapsedTime(garageTimestamps[1])}
                            </div>
                        </div>
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
                    <div className={styles.garageSlotMain}>
                        <div className={styles.garageSlotHeader}>
                            <div>
                                <b>
                                    DN3
                                </b>
                            </div>
                            <div className={styles.garageSlotTimer}>
                                {getElapsedTime(garageTimestamps[2])}
                            </div>
                        </div>
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
                    <div className={styles.garageSlotMain}>
                        <div className={styles.garageSlotHeader}>
                            <div>
                                <b>
                                    DN2
                                </b>
                            </div>
                            <div className={styles.garageSlotTimer}>
                                {getElapsedTime(garageTimestamps[3])}
                            </div>
                        </div>
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
                    <div className={styles.garageSlotMain}>
                        <div className={styles.garageSlotHeader}>
                            <div>
                                <b>
                                    DN1
                                </b>
                            </div>
                            <div className={styles.garageSlotTimer}>
                                {getElapsedTime(garageTimestamps[4])}
                            </div>
                        </div>
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
                <div className={styles.extraInfoContainer}>
                    <div className={styles.extraInfoDate}>
                        {/* <div>
                            {currentTime.toLocaleDateString("da-DK", { weekday: "long" }).charAt(0).toUpperCase() + currentTime.toLocaleDateString("da-DK", { weekday: "long" }).slice(1)}
                        </div> */}
                        <div>
                            {`${currentTime.getDate().toString().padStart(2, "0")}/${(currentTime.getMonth() + 1).toString().padStart(2, "0")}/${currentTime.getFullYear().toString().slice(-2)}`}
                        </div>
                    </div>
                    <div className={styles.extraInfoTime}>
                        <div>
                            {/* {`${currentTime.getHours().toString().padStart(2, "0")}:${currentTime.getMinutes().toString().padStart(2, "0")}:${currentTime.getSeconds().toString().padStart(2, "0")}`} */}
                            {`${currentTime.getHours().toString().padStart(2, "0")}`}:{`${currentTime.getMinutes().toString().padStart(2, "0")}`}
                        </div>
                    </div>
                    <div className={styles.extraInfoNextCar}>
                        <div>
                            Næste bil:
                        </div>
                        <div className={styles.extraInfoNextCarText}>
                            DN1
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
