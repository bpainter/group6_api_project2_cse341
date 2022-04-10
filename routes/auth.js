// const express = require("express");
// const { body } = require('express-validator');

// const User = require('../models/user');
// const authController= require("../controllers/auth");

// const router = express.Router();

// // PUT /auth/register
// router.put(
//     '/register',
//     [
//         body('name')
//             .trim(),
//         body('email')
//             .isEmail()
//             .withMessage('Please enter a valid email.')
//             .custom((value, { req }) => {
//                 return User.findOne({ email: value }).then(userDoc => {
//                     if (userDoc) {
//                         return Promise.reject('E-Mail address already exists!');
//                     }   
//                  });
//             })
//             .normalizeEmail(),
//         body('password')
//             .trim()
//             .isLength({ min: 5 }),
//         body('phone')
//             .trim()
//     ],
//     authController.register
//   );

// // POST /auth/login
// router.post("/login", authController.login);

// module.exports = router; 

const User = require('../models/UserModels')
const bcrypt = require('bcryptjs');
const auth = require('../helpers/jwt.js')


async function login({ username, password }) {
    const user = await User.findOne({username});

    // synchronously compare user entered password with hashed password
    if(user && bcrypt.compareSync(password, user.password)){
        const token = auth.generateAccessToken(username);

        // call toJSON method applied during model instantiation
        return {...user.toJSON(), token}
    }
}

async function register(params){
    // instantiate a user modal and save to mongoDB
    const user = new User(params)
    await user.save();
}

async function getById(id) {

    const user = await User.findById(id);
    // call toJSON method applied during model instantiation
    return user.toJSON()
}

module.exports = {
    login,
    register,
    getById
};