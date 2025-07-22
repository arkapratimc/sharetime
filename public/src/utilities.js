/**
 * Sends a POST request with JSON data to a specified URL and returns the parsed JSON response.
 * This function is a convenient wrapper around the Fetch API for common JSON POST operations.
 *
 * @async
 * @param {string} url - The URL to send the POST request to.
 * @param {object} data - The JavaScript object to be sent as JSON in the request body.
 * @returns {Promise<object>} A Promise that resolves with the parsed JSON response from the server.
 * @throws {Error} If the network request fails, the server responds with an HTTP error status (e.g., 404, 500),
 * or if there's an issue parsing the JSON response.
 *
 * @example
 * // How to call this function:
 * async function submitFormData() {
 * const formData = {
 * name: 'John Doe',
 * email: 'john.doe@example.com',
 * message: 'Hello from the client!'
 * };
 *
 * try {
 * const serverResponse = await postJson('/api/submit-form', formData);
 * console.log('Data submitted successfully:', serverResponse);
 * // You can update your UI here based on serverResponse
 * } catch (error) {
 * console.error('Error submitting data:', error.message);
 * // Display an error message to the user
 * }
 * }
 *
 * // Call the example function (e.g., on a button click or page load)
 * // submitFormData();
 */
async function postJson(url, data) {
    try {
        // Perform the fetch request
        const response = await fetch(url, {
            method: 'POST', // Specify the HTTP method as POST
            headers: {
                // Indicate that the request body is JSON
                'Content-Type': 'application/json'
            },
            // Convert the JavaScript object to a JSON string for the request body
            body: JSON.stringify(data)
        });

        // Check if the HTTP response status is OK (2xx success range)
        if (!response.ok) {
            // If not OK, throw an error with the status
            const errorBody = await response.text(); // Attempt to read error body for more info
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody || 'No specific error message provided.'}`);
        }

        // Parse the response body as JSON
        const result = await response.json();

        // Return the parsed JSON object
        return result;

    } catch (error) {
        // Catch any errors that occur during the fetch operation or JSON parsing
        console.error('Error in postJson function:', error);
        // Re-throw the error so the calling function can handle it
        throw error;
    }
}


module.exports = {
    postJson
}