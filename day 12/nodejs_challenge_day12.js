const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

function rateLimitMiddleware(req, res, next) {
  limiter(req, res, (err) => {
    if (err) {
      res.status(429).json({
        message: "Too Many Requests",
        retryAfter: Math.ceil(err.reset / 1000),
      });
    } else {
      next();
    }
  });
}
app.use(rateLimitMiddleware);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
