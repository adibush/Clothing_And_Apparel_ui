function dateFormatting(date) {
    // Get year, month, and day part from the date
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });
    const hour = new Date().toLocaleTimeString();


    // Generate yyyy-mm-dd date string
    return year + "-" + month + "-" + day + "-" + hour;
}

export default dateFormatting;