const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // const token = req.headers["x-authentication-token"];
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  console.log("", token);
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
