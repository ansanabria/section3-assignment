const http = require("http");

const app = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<h1>Hi Sam!</h1>");
    res.write(
      "<form action='/create-user' method='POST'><input type='text' name='username'><button type='submit'>Send</button></form>"
    );
    res.write("</html>");
  } else if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write(
      "<ul><li>User 1</li><li>User 2</li><li>User 3</li><li>User 4</li><li>User 5</li></ul>"
    );
    res.write("</html>");
  } else if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const data = Buffer.concat(body).toString();
      console.log(data.split("=")[1]);
    });
    res.writeHead(302, { Location: "/" });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<p>Page not found</p>");
    res.write("</html>");
  }
  res.end();
});

const PORT = 3000;
app.listen(PORT);
