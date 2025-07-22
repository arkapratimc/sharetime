const { postJson } = require("./utilities.js");



const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;



const timeZones = Intl.supportedValuesOf('timeZone');

const select = document.getElementById("country");

for (const tz of timeZones) {
    const option = document.createElement("option");
    option.value = tz;
    option.textContent = tz;
    select.appendChild(option);
}


const time_to_view = document.querySelector("#localTime");
const target_time_zone = document.querySelector("#country")
const submit_button = document.querySelector("#view-results");
submit_button.addEventListener("click", async (event) => {
    event.preventDefault();
    if (time_to_view.value.trim() === "") {
        alert("Please enter a time");
        return;
    }
    try {
        const serverResponse = await postJson('/api/submit-form', {
            time_to_view: time_to_view.value.trim(),
            target_time_zone: target_time_zone.value,
            userTimeZone
        });
        console.log('Data submitted successfully:', serverResponse);
    } catch (error) {
        console.error('Error submitting data:', error.message);
    }

})