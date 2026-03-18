// This function takes a garage slot object and returns how long ago the timestamp was.
const getElapsedTime = (garageSlot) => {
    if (!garageSlot || garageSlot.timestamp === undefined || garageSlot.timestamp === null) {
        return "--:--";
    }

    let timestampMs;
    const rawTimestamp = garageSlot.timestamp;

    // Handle numeric timestamps stored as strings, e.g. "1710849600"
    if (typeof rawTimestamp === "string") {
        const numericValue = Number(rawTimestamp);

        if (!Number.isNaN(numericValue)) {
            timestampMs = numericValue;
        } else {
            // Fall back to parsing ISO date strings
            const parsedDate = new Date(rawTimestamp).getTime();
            if (Number.isNaN(parsedDate)) return "--:--";
            timestampMs = parsedDate;
        }
    } else if (typeof rawTimestamp === "number") {
        timestampMs = rawTimestamp;
    } else {
        return "--:--";
    }

    // If timestamp looks like Unix seconds (too small), convert to milliseconds
    if (timestampMs < 1e12) {
        timestampMs = timestampMs * 1000;
    }

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

export default getElapsedTime;