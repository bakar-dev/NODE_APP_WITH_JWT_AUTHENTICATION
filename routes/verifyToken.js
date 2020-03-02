const jwt = require("jsonwebtoken");

const auth = function(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied!");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.send(400).send("Invalid Token");
  }
};

module.exports = auth;
