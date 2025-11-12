const http = require("http");

const hostname = "127.0.0.1"; // server adress is my own computer (local host)
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain"); //tells the browser what kind of data this is (plain text here).
    res.end("Hello Ice tea!");
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello Ice tea About!");
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("404 Not found!");
  }
  //this whole code surely does the job but we need alternate solution, cuz it;s not very convenient
});

server.listen(port, hostname, () => {
  console.log(`Server is listening at http://${hostname}:${port}`);
});
