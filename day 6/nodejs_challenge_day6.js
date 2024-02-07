const express = require("express");
const app = express();
const port = 4000;

function greetHandler(req, res) {
  const name = req.query.name;
  if (name) {
    res.send(`Hello, ${name}!`);
  } else {
    res.send("Hello, Guest!");
  }
}
app.get("/greet", (req, res) => {
  greetHandler(req, res);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
