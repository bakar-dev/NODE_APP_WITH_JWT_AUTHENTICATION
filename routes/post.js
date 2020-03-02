const router = require("express").Router();
const auth = require("./verifyToken");

router.get("/posts", auth, async (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
