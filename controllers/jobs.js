const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const Job = require("../models/job");

const createJob = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error('No image provided.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const employer = req.body.employer;
  const location = req.body.location;
  const details = req.body.details;
  const qualifications = req.body.qualifications;
  const description = req.body.description;
  const post = new Job({
    title: title,
    employer: employer,
    location: location,
    details: details,
    qualifications: qualifications,
    description: description
  });
  job
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Post created successfully!',
        job: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const getJob = async (req, res, next) => {
  const jobId = req.params.jobId;
  Job.findById(jobId)
    .then(job => {
      if (!job) {
        const error = new Error('Could not find job post.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Job Post fetched.', job: job });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const updateJob = async (req, res, next) => {
  const jobId = req.params.jobId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const employer = req.body.employer;
  const location = req.body.location;
  const details = req.body.details;
  const qualifications = req.body.qualifications;
  const description = req.body.description;
  Post.findById(jobId)
    .then(job => {
      if (!job) {
        const error = new Error('Could not find job post.');
        error.statusCode = 404;
        throw error;
      }
      job.title = title,
      job.employer = employer,
      job.location = location,
      job.details = details,
      job.qualifications = qualifications,
      job.description = description

      return job.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Job post updated!', job: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const deleteJob = async (req, res, next) => {
  const jobId = req.params.jobId;
  Post.findById(jobId)
    .then(job => {
      if (!job) {
        const error = new Error('Could not find job post.');
        error.statusCode = 404;
        throw error;
      }

      return Job.findByIdAndRemove(jobId);
    })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'Deleted job post.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const getJobs = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalJobs;
  Job.find()
    .countDocuments()
    .then(count => {
      totalJobs = count;
      return Job.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(jobs => {
      res
        .status(200)
        .json({
          message: 'Fetched job posts successfully.',
          jobs: jobs,
          totalJobs: totalJobs
        });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

module.exports = {
  createJob,
  getJob,
  updateJob,
  deleteJob,
  getJobs,
};