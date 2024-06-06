const http = require("http");

const app = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  res.write("<html>");
  if (url === "/") {
    res.write("<h1>Hi Sam!</h1>");
    res.write(
      "<form action='/create-user' method='POST'><input type='text' name='username'><button type='submit'>Send</button></form>"
    );
  } else if (url === "/users") {
    res.write(
      "<ul><li>User 1</li><li>User 2</li><li>User 3</li><li>User 4</li><li>User 5</li></ul>"
    );
  } else if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const data = Buffer.concat(body).toString();
      console.log(data);
    });
  }
  res.write("</html>");
  res.end();
});

const PORT = 3000;
app.listen(PORT);
