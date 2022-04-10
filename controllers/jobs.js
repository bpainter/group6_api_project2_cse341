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
  Job
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
const getJob = async (req, res) => {};

const updateJob = async (req, res) => {};

const deleteJob = async (req, res) => {};

const getJobs = async (req, res) => {};

module.exports = {
  createJob,
  getJob,
  updateJob,
  deleteJob,
  getJobs,
};