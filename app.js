var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,


    User = require('./models/User'),
    jsonwebtoken = require("jsonwebtoken");
var cors = require('cors');
app.use(cors({origin: "http://localhost:3002"}))
//app.use(cors());
//express.use(cors());
const mongoose = require('mongoose');
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000
};
// Add a .env to the folder and include
// the environment variables for the API
require('dotenv').config();

const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

// Routers for authentication & job CRUD
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

const api = express();

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

// Set up paths for the api
api.use("/auth", authRouter);
api.use("/jobs", jobsRouter);

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

// const mongoURI = process.env.MONGODB_URI;
// mongoose.connect('mongodb+srv://zarrydie:Jayden0907)()&@cluster0.iwktp.mongodb.net/jobdbb?retryWrites=true&w=majority', option).then(function () {
//     //connected successfully
// }
//  function (err) {
//     //err handle
// });