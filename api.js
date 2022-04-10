// // Add a .env to the folder and include
// // the environment variables for the API
// require('dotenv').config();

// const path = require('path');

// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const multer = require('multer');

// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
// const csrf = require('csurf');
// const flash = require('connect-flash');
// const app = express();
// //const {auth} = require('express-openid-connect');
// // routers
// const authRouter = require("./routes/auth");
// const jobsRouter = require("./routes/jobs");
// const store = new MongoDBStore({
//   uri: process.env.MONGODB_URI,
//   collection: 'sessions'
// });
// //const csrfProtection = csrf();
// const csrfProtection = csrf({
//   cookie: false,
// });

// const api = express();

// api.use(bodyParser.json());

// app.use(bodyParser.urlencoded({
//   extended: false
// }));

// app.use(session({
//     secret: 'my secret',
//     resave: false,
//     saveUninitialized: false,
//     store: store
//   })
// );
// app.use(csrfProtection);
// app.use(flash());

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

// // Set up paths for the api
// api.use("/auth", authRouter);
// api.use("/jobs", jobsRouter);

// // app.get('/500', errorController.get500);
// // app.use(errorController.get404);
// // app.use((error, req, res, next) => {
// //   // res.status(error.httpStatusCode).render(...);
// //   // res.redirect('/500');
// //   res.status(500).render('500', {
// //     pageTitle: 'Error!',
// //     path: '/500',
// //     isAuthenticated: req.session.isLoggedIn
// //   });
// // });

// // open id connect alternative
// const {
//   auth
// } = require('express-openid-connect');
// app.use(
//   auth({
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     secret: process.env.SECRET,
//     idpLogout: true,
//   })
// );

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(result => {

//     app.listen(process.env.PORT, () => {

//       // Routers for authentication & job CRUD
//       const authRouter = require("./routes/auth");
//       const jobsRouter = require("./routes/jobs");

//       api.use(bodyParser.json());

//       // Set headers for the REST API calls
//       api.use((req, res, next) => {
//         res.setHeader('Access-Control-Allow-Origin', '*');
//         res.setHeader(
//           'Access-Control-Allow-Methods',
//           'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//         );
//         res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//         next();
//       });

//       // Set up paths for the versioned api
//       api.use("/api/v1/auth", authRouter);
//       api.use("/api/v1/jobs", jobsRouter);

//       // Handle errors
//       api.use((error, req, res, next) => {
//         console.log(error);
//         const status = error.statusCode || 500;
//         const message = error.message;
//         const data = error.data;
//         res.status(status).json({
//           message: message,
//           data: data
//         });
//       });


//     })
//   });

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const unless = require('express-unless')
const auth = require('../server/helpers/jwt.js');
const users = require('../server/controllers/UserController.js')
const errors = require('../server/helpers/errorHandler.js')

app.use(cors({origin: "http://localhost:3001"})) // Default = CORS-enabled for all origins Access-Control-Allow-Origin: *!
app.use(express.json()) // middleware for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded

// middleware for authenticating token submitted with requests
auth.authenticateToken.unless = unless
app.use(auth.authenticateToken.unless({
    path: [
        { url: '/users/login', methods: ['POST']},
        { url: '/users/register', methods: ['POST']}
    ]
}))

app.use('/users', users) // middleware for listening to routes
app.use(errors.errorHandler); // middleware for error responses

// MongoDB connection, success and error event responses
const uri = "mongodb+srv://gavmac:project-ahoi-there@cluster-ahoi-there.t33qr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`Connected to mongo at ${uri}`));

app.listen(3000);

