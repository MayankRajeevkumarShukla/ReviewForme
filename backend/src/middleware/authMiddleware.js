const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET || "mayank123");
    req.user = decode;
    next();
  } catch (error) {
    const message =
      error.name === "TokenExpiredError"
        ? "Token expired. Please log in again."
        : "Invalid Token";
    res.status(401).json({ message });
  }
};
module.exports = authMiddleware;
