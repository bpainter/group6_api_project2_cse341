const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    // 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);