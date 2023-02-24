const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  // Verify token
  if (!token) return res.status(401).json({ message: "No token provided." });
  const bearer = token.split(" ");

  if (bearer[0] !== "Bearer")
    return res.status(400).json({ message: "Invalid token." });

  jwt.verify(bearer[1], "secret", (err, decoded) => {
    if (err)
      return res.status(500).json({ message: "Failed to authenticate token." });

    // Set decoded username to the request object
    req.username = decoded.username;
    next();
  });
};

module.exports = auth;
