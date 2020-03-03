const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation
} = require("../validation/authValidation");

router.post("/register", async (req, res) => {
  //VALIDATE DATA BEFORE
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password, role } = req.body;

  //check email Already exist
  const emailExist = await User.findOne({ email });
  if (emailExist) return res.status(400).send("Email already exists.");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create User
  const user = new User({ name, email, password: hashedPassword, role });
  try {
    const savedUSer = await user.save();
    res.status(200).send({ user: savedUSer });
  } catch (error) {
    res.status(400).send(error);
  }
});

//login route

router.post("/login", async (req, res) => {
  //VALIDATE DATA BEFORE
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  //check user exist
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Email not found.");

  //validate Passsword
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("Password is invalid");

  //assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
