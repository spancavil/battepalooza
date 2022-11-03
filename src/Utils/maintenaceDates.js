export const getMaintenanceRandomTime = () => {
    const futureDate = Date.now() + Math.floor(Math.random() * 1E9)
    const pastDate = Date.now() - Math.floor(Math.random() * 1E9)
    return {start: pastDate, end: futureDate}
}

export const getStartAndEndMessages = (startTime, endTime) => {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const startMessage = `${monthName[startDate.getMonth()]} ${startDate.getDate()}: ${startDate.getHours()}:${startDate.getMinutes().toString().length === 1 ? `0${startDate.getMinutes()}`: startDate.getMinutes()} h`
    const endMessage = `${monthName[endDate.getMonth()]} ${endDate.getDate()}: ${endDate.getHours()}:${endDate.getMinutes().toString().length === 1 ? `0${endDate.getMinutes()}`: endDate.getMinutes()} h`
    return {startMessage, endMessage}
}