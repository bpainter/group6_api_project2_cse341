const express = require("express");
const { body } = require('express-validator/check');
const router = express.Router();

// Creates the routes for standard CRUD with the addition
// of returning all Jobs
const {
  createJob,
  getJob,
  updateJob,
  deleteJob,
  getJobs,
} = require("../controllers/jobs");

router.route("/").post(createJob).get(getJobs);

router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;