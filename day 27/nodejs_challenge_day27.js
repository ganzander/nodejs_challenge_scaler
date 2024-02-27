const jwt = require("jsonwebtoken");

function authenticateAndAuthorize(req, res, next) {
  const token = req.header("Authorization");
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "your_secret_key_here");
    console.log(decoded);
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. You do not have the required role." });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
}

authenticateAndAuthorize();
