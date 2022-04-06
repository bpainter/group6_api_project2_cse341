const Job = require("../models/Job");
const {
  StatusCodes
} = require("http-status-codes");

const createJob = async (req, res) => {
 try {const job = new Job({
    title:req.body.title,
    name:req.body.name,
    employer:req.body.employer,
    location:req.body.location,
    details:req.body.details,
    qualification:req.body.qualification,
    description:req.body.description,
    datePosted:req.body.datePosted,
    timestamps:req.body.timestamps
  }); 
  const savedjob = await job.save();
  res.status(200).json(savedjob);
}catch (err) {
  res.status(500).json(err);
}
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