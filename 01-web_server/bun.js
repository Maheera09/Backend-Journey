import { serve } from "bun";

//bun has it's own way of serving things and giving the response.
//This is a simple web server built using Bun, which is an alternative to Node.js that runs JavaScript and TypeScript faster and has built-in tools like a web server, bundler, and package manager.
serve({
  //Bun provides a built-in serve API that lets you quickly create an HTTP server — similar to Node.js’s http.createServer() or Express.
  //The serve() function starts a server.
  // You pass it an object with:
  // A fetch handler (this handles incoming HTTP requests — it’s similar to the browser fetch API, but reversed).
  // A port and hostname where your server will run.
  fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/") {
      return new Response("Hello ice tea!", { status: 200 });
    } else if (url.pathname === "/about") {
      return new Response("Hello ice tea Bun About!", { status: 200 });
    } else {
      return new Response("404 Not found", { status: 404 });
    }
  },
  port: 3000,
  hostname: "127.0.0.1",
});
