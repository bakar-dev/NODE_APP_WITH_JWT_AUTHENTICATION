const router = require("express").Router();
const auth = require("./verifyToken");
const User = require("../model/User");

router.get("/", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  res.json({ user: user });
});

module.exports = router;
