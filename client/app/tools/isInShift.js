// Helper function to determine if a unit is currently in their active shift period
const isInShift = (currentTime, garageSlot) => {
    const now = currentTime;
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const { shiftStart, shiftEnd, status, workInWeekends } = garageSlot;

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

export default isInShift;