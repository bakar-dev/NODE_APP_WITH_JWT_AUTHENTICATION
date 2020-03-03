const jwt = require("jsonwebtoken");
const User = require("../model/User");

//authenticate user token
const authentication = async function(req, res, next) {
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

//authorize access to specific USer Role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(400).send("Not Authorized");
    }
    next();
  };
};

module.exports = { authentication, authorize };
