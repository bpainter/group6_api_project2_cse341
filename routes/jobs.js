const express = require("express");
const { body } = require('express-validator');
const router = express.Router();

const isAuth = require('../middleware/is-auth');

// Creates the routes for standard CRUD with the addition
// of returning all Jobs
const {
  createJob,
  getJob,
  updateJob,
  deleteJob,
  getJobs,
} = require("../controllers/jobs");

// POST /post
router.post(
  '/job',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  createJob
);

// GET /job/:id
router.get('/job/:jobId', isAuth, getJob);

// UPDATE /job/:id
router.put(
  '/job/:jobtId',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  updateJob
);

// DELETE
router.delete('/job/:jobID', isAuth, deleteJob);

// GET all jobs /jobs
router.get('/', isAuth, getJobs);

module.exports = router;