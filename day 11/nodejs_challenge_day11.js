const jwt = require("jsonwebtoken");

function authenticationMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  jwt.verify(token, "theSecretKey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded;
    console.log("You can proceed");
    next();
  });
}

module.exports = authenticationMiddleware;
