const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url'); // To parse request URLs


function serveFile(filePath, contentType, res) {
    fs.readFile(path.join(__dirname, filePath), (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('500 Server Error');
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}


const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url);
    if (req.url === '/' || req.url === '/index.html') {
        serveFile('public/index.html', 'text/html', res);
    } else if (req.url === '/style.css') {
        serveFile('public/style.css', 'text/css', res);
    } else if (req.url === '/script.js') {
        serveFile('public/script.js', 'text/javascript', res);
    } else if (req.url === "/favicon.ico") {
        res.writeHead(204); // No Content
        return res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});


const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});