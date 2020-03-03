const router = require("express").Router();
const { authentication, authorize } = require("../middlewares/verify");
const Application = require("../model/Application");
const User = require("../model/User");

const { validateNewApplication } = require("../validation/appValidation");

//get application
router.get("/:id", authentication, async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (!application) return res.send("No Application found.");
  res.json({ application: application });
});

//apply on application
router.post("/:id/apply", authentication, async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (!application) return res.send("No Application found.");

  if (application.applicants.includes(req.user._id))
    return res.send("Already applied");

  try {
    const user = await User.findById(req.user._id);
    const applications = [...user.applications, application._id];
    const applicants = [...application.applicants, req.user._id];

    //update application
    const app = await Application.findByIdAndUpdate(req.params.id, {
      applicants
    });
    //update user
    const updatedUser = await User.findByIdAndUpdate(req.user._id, {
      applications
    });

    res.send("Successfully applied.");
  } catch (error) {
    res.status(400).send(error);
  }
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
