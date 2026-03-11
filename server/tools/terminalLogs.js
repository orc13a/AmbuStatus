import boxen from 'boxen';
import { getDateTimeNow } from './time.js';

// ##
// Boxen
// ##

export const logSuccess = (text) => {
    console.log(
        boxen(text, {
            title: getDateTimeNow(), borderStyle: 'round', padding: 1, borderColor: 'greenBright' 
        })
    );
}

export const logError = (text) => {
    console.log(
        boxen(text, {
            title: getDateTimeNow(), borderStyle: 'round', padding: 1, borderColor: 'redBright' 
        })
    );
}

export const logProgress = (text) => {
    console.log(
        boxen(text, {
            title: getDateTimeNow(), borderStyle: 'round', padding: 1, borderColor: 'blueBright' 
        })
    );
}

export const logWarning = (text) => {
    console.log(
        boxen(text, {
            title: getDateTimeNow(), borderStyle: 'round', padding: 1, borderColor: 'yellowBright' 
        })
    );
}

// ##
// ##