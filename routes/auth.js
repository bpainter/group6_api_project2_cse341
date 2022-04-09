const express = require("express");
const { body } = require('express-validator');

const router = express.Router();

// const { register, login } = require("../controllers/auth");
const authController= require("../controllers/auth");

router.put(
    '/register',
    [
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
      body('name')
        .trim()
        .not()
        .isEmpty()
    ],
    authController.register
  );

router.post("/login", authController.login);

module.exports = router;