const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    employer: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    details: {
      type: String,
      required: true
    },
    qualifications: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    datePosted: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);