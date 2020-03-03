const router = require("express").Router();
const { authentication, authorize } = require("../middlewares/verify");
const Application = require("../model/Application");

const { validateNewApplication } = require("../validation/appValidation");

router.get("/", authentication, async (req, res) => {
  res.json({ user: req.user });
});

//create new application
router.post("/create", authentication, authorize("admin"), async (req, res) => {
  const { error } = validateNewApplication(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  req.body.user = req.user._id;

  const application = new Application({ ...req.body });
  try {
    const savedApp = await application.save();
    res.status(200).send({ application: savedApp });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
