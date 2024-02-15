const express = require("express");
const cache = {};
const app = express();

function cachingMiddleware(req, res, next) {
  const { url } = req;
  const cachedResponse = cache[url];
  if (cachedResponse) {
    const { response, expirationTime } = cachedResponse;
    if (expirationTime > Date.now()) {
      res.send(response);
      return;
    } else {
      delete cache[url];
    }
  }
  const originalSend = res.send;
  res.send = function (body) {
    cache[url] = {
      response: body,
      expirationTime: Date.now() + 5 * 60 * 1000,
    };
    originalSend.call(this, body);
  };
  next();
}

app.use(cachingMiddleware);
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
