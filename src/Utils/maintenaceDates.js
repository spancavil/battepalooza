export const getMaintenanceRandomTime = () => {
    const futureDate = Date.now() + Math.floor(Math.random() * 1E9)
    const pastDate = Date.now() - Math.floor(Math.random() * 1E9)
    return {start: pastDate, end: futureDate}
}

export const getStartAndEndMessages = (startTime, endTime) => {
    //The time comes in seconds
    const startDate = new Date(startTime * 1000);
    //The time comes in seconds
    const endDate = new Date(endTime * 1000);

    var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const startMessage = `${monthName[startDate.getUTCMonth()]} ${startDate.getUTCDate()}: ${startDate.getUTCHours()}:${startDate.getUTCMinutes().toString().length === 1 ? `0${startDate.getUTCMinutes()}`: startDate.getUTCMinutes()} h`
    const endMessage = `${monthName[endDate.getUTCMonth()]} ${endDate.getUTCDate()}: ${endDate.getUTCHours()}:${endDate.getUTCMinutes().toString().length === 1 ? `0${endDate.getUTCMinutes()}`: endDate.getUTCMinutes()} h UTC`
    return {startMessage, endMessage}
}