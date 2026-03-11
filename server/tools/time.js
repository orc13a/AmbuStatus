// Få tid nu
// Dette er mest for at skrive i terminalen hvornår noget sker

export const getTimeNow = () => {
    let today = new Date();
    
    let hours = today.getHours().toString();
    let minutes = today.getMinutes().toString();
    let seconds = today.getSeconds().toString();

    if (hours.length < 2) {
        hours = '0' + hours;
    }

    if (minutes.length < 2) {
        minutes = '0' + minutes;
    }

    if (seconds.length < 2) {
        seconds = '0' + seconds;
    }

    const time = hours + ':' + minutes + ':' + seconds;

    return time;
}

export const getDateTimeNow = () => {
    let today = new Date();
    
    let hours = today.getHours().toString();
    let minutes = today.getMinutes().toString();
    let seconds = today.getSeconds().toString();

    let date = today.getDate().toString();
    let month = (today.getMonth() + 1).toString();
    let year = today.getFullYear().toString();

    if (hours.length < 2) {
        hours = '0' + hours;
    }

    if (minutes.length < 2) {
        minutes = '0' + minutes;
    }

    if (seconds.length < 2) {
        seconds = '0' + seconds;
    }

    if (date.length < 2) {
        date = '0' + date;
    }

    if (month.length < 2) {
        month = '0' + month;
    }

    const time = hours + ':' + minutes + ':' + seconds;
    const d = date + '-' + month + '-' + year;

    return time + ' | ' + d;
}