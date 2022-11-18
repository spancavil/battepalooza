import packService from "../Services/pack.service";

const generateDate = (rawDate) => {
    const milliseconds = Date.parse(rawDate);
    var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date(milliseconds);
    //const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const dateString = monthName[month] + ", " + year;
    return dateString;
}
/**
 * 
 * @param {*} startTime The start time of drop in milliseconds
 * @param {*} endTime The end time of drop in milliseconds
 * @returns {*} {state: "willBeActive | active | ended ", message: "Days: Hours: minutes"}
 */
export const getDaysMinutesSeconds = async (startTime, endTime) => {

    const millisecondsStart = startTime;
    const millisecondsEnd = endTime;

    const getTime = await packService.getNowTimeFromServer();
    console.log(getTime.unixtime);
    const millisecondsNow = getTime.unixtime;

    const millisecondsLeftStart = millisecondsStart - millisecondsNow;
    const millisecondsLeftEnd = millisecondsEnd - millisecondsNow;

    const operand = (1000 * 3600 * 24) //Operand to pass mlliseconds to days.

    if (millisecondsLeftStart > 0) {
        const state = "willBeActive";

        const days = millisecondsLeftStart / operand
        const daysLeft = Math.floor(days);
        //Parte decimal de los daysLeft
        const daysDecimal = (days) % 1 

        const hours = daysDecimal * 24;
        const hoursLeft = Math.floor(hours).toLocaleString('en-US', {minimumIntegerDigits: 2});
        //Parte decimal de hoursLeft
        const hoursLeftDecimal = (hours) % 1;

        const minutesLeft = Math.round(hoursLeftDecimal * 60).toLocaleString('en-US', {minimumIntegerDigits: 2});

        const minutes = hoursLeftDecimal * 60;
        const minutesLeftDecimal = minutes % 1;

        const secondsLeft = Math.round(minutesLeftDecimal * 60).toLocaleString('en-US', {minimumIntegerDigits: 2});
        
        const message = `Available in: ${daysLeft}:${hoursLeft}:${minutesLeft}: ${secondsLeft}`
        return ({state, message})
    }

    else if (millisecondsLeftEnd > 0 && millisecondsLeftStart < 0) {
        const state = "active";

        const days = millisecondsLeftEnd / operand
        const daysLeft = Math.floor(days);
        //Parte decimal de los daysLeft
        const daysDecimal = (days) % 1 

        const hours = daysDecimal * 24;
        const hoursLeft = Math.floor(hours).toLocaleString('en-US', {minimumIntegerDigits: 2});
        //Parte decimal de hoursLeft
        const hoursLeftDecimal = (hours) % 1;

        const minutes = hoursLeftDecimal * 60;
        const minutesLeft = Math.round(hoursLeftDecimal * 60).toLocaleString('en-US', {minimumIntegerDigits: 2});
        const minutesLeftDecimal = minutes % 1;

        const secondsLeft = Math.round(minutesLeftDecimal * 60).toLocaleString('en-US', {minimumIntegerDigits: 2});

        const message = `${daysLeft}:${hoursLeft}:${minutesLeft}:${secondsLeft}`;
        return ({state, message});

    }

    else if (millisecondsLeftEnd < 0 && millisecondsLeftStart < 0) {
        const state = "ended";
        const message = 'The drop has ended';
        return ({state, message})
    }
}

export default generateDate;