import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "..", "states.json");

export function updateState(sensorId, newStatus) {
    // 1. Læs fil
    const rawData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(rawData);

    const current = data[sensorId];

    if (!current) {
        console.log("Sensor not found:", sensorId);
        return null;
    }

    // 2. Tjek om der er ændring
    if (current.status === newStatus) {
        return null; // ingen ændring → gør ingenting
    }

    // 3. Opdater state
    current.status = newStatus;
    current.timestamp = Date.now();

    // 4. Skriv tilbage til fil
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return current; // returnér opdateret state
}