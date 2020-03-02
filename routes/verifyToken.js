const jwt = require("jsonwebtoken");
const User = require("../model/User");

const auth = async function(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied!");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ _id: verified._id });
    req.user = user;
    next();
  } catch (error) {
    res.send(400).send("Invalid Token");
  }
};

module.exports = auth;
