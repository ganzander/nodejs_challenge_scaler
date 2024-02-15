const express = require("express");
const app = express();

function loggingMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
}

app.use(loggingMiddleware);
app.use("/", loggingMiddleware, (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
