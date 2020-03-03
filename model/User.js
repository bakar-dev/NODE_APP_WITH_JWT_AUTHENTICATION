const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["employee", "employer"],
    default: "employee"
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  applications: {
    type: [mongoose.Schema.ObjectId],
    ref: "Application"
  }
});

module.exports = mongoose.model("User", userSchema);
