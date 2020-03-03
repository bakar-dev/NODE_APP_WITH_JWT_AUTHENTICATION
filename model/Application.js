const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  website: {
    type: String
  },
  industry: {
    type: String,
    required: true,
    enum: [
      "Information Technology",
      "Banking",
      "Manufactoring",
      "Education",
      "Other"
    ]
  },
  type: {
    type: String,
    required: true,
    enum: ["Full Time", "Part Time", "Other"]
  },
  shift: {
    type: String,
    enum: ["Day", "Night"]
  },
  salary: {
    type: Number
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description can not be more than 500 characters"]
  },
  location: {
    type: String,
    required: true
  },
  postedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: +new Date() + 30 * 24 * 60 * 60 * 1000
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  applicants: {
    type: [mongoose.Schema.ObjectId],
    ref: "User"
  }
});

module.exports = mongoose.model("Application", applicationSchema);
