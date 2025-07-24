const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url"); // To parse request URLs
// Load Luxon
const { DateTime } = require("luxon");
const { parseTime, time_string } = require("./src/server_utils.js");

const DATETIME_REGEX = /^\/([^\/]+)\/([^\/]+)\/(\d{4})$/;

function serveFile(filePath, contentType, res) {
  fs.readFile(path.join(__dirname, filePath), (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end("500 Server Error");
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  if (req.url === "/" || req.url === "/index.html") {
    serveFile("public/index.html", "text/html", res);
  } else if (req.url === "/style.css") {
    serveFile("public/style.css", "text/css", res);
  } else if (req.url === "/home.bundle.js") {
    serveFile("public/home.bundle.js", "text/javascript", res);
  } else if (req.url === "/favicon.ico") {
    res.writeHead(204); // No Content
    return res.end();
  } else if (req.url === "/api/submit-form" && req.method === "POST") {
    // from here - https://g.co/gemini/share/17ad757be9c5
    let body = "";

    // Listen for data chunks
    req.on("data", (chunk) => {
      body += chunk.toString(); // Convert Buffer to string
    });

    // When all data is received
    req.on("end", () => {
      // console.log('Received data from client:', body);

      // You'll likely need to parse this data based on how you send it from the client.
      // For example, if it's URL-encoded:
      // const parsedData = new URLSearchParams(body);
      // const inputValue = parsedData.get('inputValue'); // Assuming the input field's name is 'inputValue'

      // If it's JSON:
      try {
        const jsonData = JSON.parse(body);
        // console.log('Parsed JSON data:', jsonData);
        // Do something with jsonData.inputContent or jsonData.textareaContent
        // e.g., save to a database, process it, etc.

        const SOURCE_TIME = DateTime.fromISO(
          time_string(jsonData.time_to_view),
          {
            zone: jsonData.target_time_zone,
          },
        );

        const TIME_IN_USERS_ZONE = SOURCE_TIME.setZone(jsonData.userTimeZone);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Data received successfully!",
            receivedData: {
              SOURCE_TIME: SOURCE_TIME.toFormat("hh:mm a ZZZZ"),
              TIME_IN_USERS_ZONE: TIME_IN_USERS_ZONE.toFormat("hh:mm a ZZZZ"),
            },
          }),
        );
      } catch (error) {
        console.error("Error parsing JSON:", error);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Error: Invalid JSON data." }));
      }
    });
  } else if (DATETIME_REGEX.test(path)) {
    serveFile("public/display_only.html", "text/html", res);
  } else if (req.url === "/doze.bundle.js") {
    serveFile("public/doze.bundle.js", "text/javascript", res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
