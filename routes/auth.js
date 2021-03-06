const express = require("express");
const { body } = require('express-validator');

const User = require('../models/user');
const authController= require("../controllers/auth");

const router = express.Router();

// PUT /auth/register
router.put(
    '/register',
    [
        body('name')
            .trim(),
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('E-Mail address already exists!');
                    }   
                 });
            })
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 5 }),
        body('phone')
            .trim()
    ],
    authController.register
  );

// POST /auth/login
router.post("/login", authController.login);

module.exports = router;