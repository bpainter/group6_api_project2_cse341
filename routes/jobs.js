const express = require("express");
const router = express.Router();

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