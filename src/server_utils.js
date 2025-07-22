function parseTime(inputTime) {
    const [hour, minute] = inputTime.split(":").map(Number);
    return [hour, minute]
}

function time_string(userTime) {
    // STEP 1: Get today's date in YYYY-MM-DD
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const dd = String(today.getDate()).padStart(2, '0');

    // STEP 2: Get time from user input (e.g., "14:00")
    
    // or from a prompt, etc.

    // STEP 3: Combine into ISO string
    const isoDateTime = `${yyyy}-${mm}-${dd}T${userTime}`;

    return isoDateTime

}


module.exports = {
    parseTime,
    time_string
}