// Add a .env to the folder and include
// the environment variables for the API
require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const app = express();


// routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();

// Create the routes/
// Follow a versioned API convention
app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  // throw new Error('Sync Dummy');
//   if (!req.session.user) {
//     return next();
//   }
//   User.findById(req.session.user._id)
//     .then(user => {
//       if (!user) {
//         return next();
//       }
//       req.user = user;
//       next();
//     })
//     .catch(err => {
//       next(new Error(err));
//     });
});

// app.get('/500', errorController.get500);
// app.use(errorController.get404);
// app.use((error, req, res, next) => {
//   // res.status(error.httpStatusCode).render(...);
//   // res.redirect('/500');
//   res.status(500).render('500', {
//     pageTitle: 'Error!',
//     path: '/500',
//     isAuthenticated: req.session.isLoggedIn
//   });
// });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(result => {
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });