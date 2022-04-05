// Add a .env to the folder and include
// the environment variables for the API
require('dotenv').config();

const express = require('express');
const api = express();

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property
const bodyParser = require('body-parser');

// Connect to mongoDB
const mongoose = require('mongoose');

// Routers for authentication & job CRUD
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

api.use(bodyParser.json());

// Set headers for the REST API calls
api.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Set up paths for the versioned api
api.use("/api/v1/auth", authRouter);
api.use("/api/v1/jobs", jobsRouter);

// Handle errors
api.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// Connect to MonboDB
// Environment info are stores in the .env file
mongoose
  .connect(process.env.MONGODB_URI)
  .then(result => {
    api.listen(process.env.PORT, () => {
      console.log(`Job API up and running successfully`);
      console.log(`Server listening on ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });