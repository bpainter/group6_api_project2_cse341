const express = require("express");
const { body } = require('express-validator');

const jobsController = require('../controllers/jobs')
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /jobs/all
router.get('/all', isAuth, jobsController.getJobs);

// POST /jobs/job
router.post(
  '/job',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('employer')
      .trim()
      .isLength({ min: 5 }),
    body('location')
      .trim()
      .isLength({ min: 5 }),
    body('details')
      .trim()
      .isLength({ min: 5 }),
    body('qualifications')
      .trim()
      .isLength({ min: 5 }),
    body('description')
      .trim()
      .isLength({ min: 5 })
  ],
  jobsController.createJob
);

// GET /jobs/job/:id
router.get('/job/:jobId', isAuth, jobsController.getJob);

// UPDATE /job/job/:id
router.put(
  '/job/:jobtId',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('employer')
      .trim()
      .isLength({ min: 5 }),
    body('location')
      .trim()
      .isLength({ min: 5 }),
    body('details')
      .trim()
      .isLength({ min: 5 }),
    body('qualifications')
      .trim()
      .isLength({ min: 5 }),
    body('description')
      .trim()
      .isLength({ min: 5 })
  ],
  jobsController.updateJob
);

// DELETE /jobs/job/:id
router.delete('/job/:jobID', isAuth, jobsController.deleteJob);

module.exports = router;