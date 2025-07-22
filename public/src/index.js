const { postJson } = require("./utilities.js");



function add(a, b) {
    return a + b
}


const y = add(5, 3);

console.log(y);


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
submit_button.addEventListener("click", (event) => {
    event.preventDefault();
    if (time_to_view.value.trim() === "") {
        alert("Please enter a time");
        return;
    }
    

})