const { postJson } = require("./utilities.js");

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const timeZones = Intl.supportedValuesOf("timeZone");

const select = document.getElementById("country");

for (const tz of timeZones) {
  const option = document.createElement("option");
  option.value = tz;
  option.textContent = tz;
  select.appendChild(option);
}

const time_to_view = document.querySelector("#localTime");
const target_time_zone = document.querySelector("#country");
const submit_button = document.querySelector("#view-results");
const RESULTS = document.querySelector("#result");


submit_button.addEventListener("click", async (event) => {
  event.preventDefault();
  if (time_to_view.value.trim() === "") {
    alert("Please enter a time");
    return;
  }
  try {
    const target = target_time_zone.value;
    
    const serverResponse = await postJson("/api/submit-form", {
      time_to_view: time_to_view.value.trim(),
      target_time_zone: target_time_zone.value,
      userTimeZone,
    });

    RESULTS.innerHTML = "";

    const heading = document.createElement("h2");
    heading.textContent = `Time in ${target}`;
    

    const paragraph = document.createElement("p");
    paragraph.textContent = `${serverResponse.receivedData.SOURCE_TIME}`;
    paragraph.classList.add("center-text");


    const heading_2 = document.createElement("h2");
    heading_2.textContent = `Time in ${userTimeZone}`;
    

    const paragraph_2 = document.createElement("p");
    paragraph_2.textContent = `${serverResponse.receivedData.TIME_IN_USERS_ZONE}`;
    paragraph_2.classList.add("center-text");
    

    RESULTS.appendChild(heading);
    RESULTS.appendChild(paragraph);
    RESULTS.appendChild(heading_2);
    RESULTS.appendChild(paragraph_2);
    // console.log("Data submitted successfully:", serverResponse);
  } catch (error) {
    console.error("Error submitting data:", error.message);
  }
});
