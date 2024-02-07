const express = require("express");
const app = express();
const port = 3000;
function requestLoggerMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  console.log(`${timestamp} - ${method} request received.`);
  next();
}
app.use(requestLoggerMiddleware);
app.get("/abc", requestLoggerMiddleware, (req, res) => {
  res.send("Response from the route");
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
