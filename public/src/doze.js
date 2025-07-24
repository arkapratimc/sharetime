const { postJson, convertTimeToNumberString, convertNumberStringToTime } = require("./utilities.js");
const pathname = window.location.pathname;
const RESULTS = document.querySelector("#result");

const DATETIME_REGEX = /^\/([^\/]+)\/([^\/]+)\/(\d{4})$/;


if (DATETIME_REGEX.test(pathname) === false) {
    console.error("Not supported");
    return;
}


const THINGS_TO_SEND = pathname.match(DATETIME_REGEX);
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;


async function lets_figure_out() {
    try {
        const serverResponse = await postJson('/api/submit-form', {
            time_to_view: convertNumberStringToTime(THINGS_TO_SEND[3]),
            target_time_zone: `${THINGS_TO_SEND[1]}/${THINGS_TO_SEND[2]}`,
            userTimeZone,
        });
        RESULTS.innerHTML = "";

        const heading = document.createElement("h2");
        heading.textContent = `Time in ${THINGS_TO_SEND[1]}/${THINGS_TO_SEND[2]}`;


        const paragraph = document.createElement("p");
        paragraph.textContent = `${serverResponse.receivedData.SOURCE_TIME}`;
        paragraph.classList.add("center-text");


        const heading_2 = document.createElement("h2");
        heading_2.textContent = `Time in ${userTimeZone}`;


        const paragraph_2 = document.createElement("p");
        paragraph_2.textContent = `${serverResponse.receivedData.TIME_IN_USERS_ZONE}`;
        paragraph_2.classList.add("center-text");

        // copy_box.textContent = `${window.location.origin}/${target}/${convertTimeToNumberString(time_to_view.value.trim())}`
        // copy_box.classList.remove("display-none");
        // copy_box.classList.add("display-block");

        // copy_status.classList.remove("display-none");
        // copy_status.classList.add("display-block");

        RESULTS.appendChild(heading);
        RESULTS.appendChild(paragraph);
        RESULTS.appendChild(heading_2);
        RESULTS.appendChild(paragraph_2);
    } catch (error) {
        console.error("Error submitting data:", error.message);
    }
}

lets_figure_out()