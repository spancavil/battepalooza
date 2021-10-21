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

export default generateDate;