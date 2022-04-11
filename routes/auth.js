'use strict';

module.exports = function (app) {

    var userHandlers = require('../controllers/auth');

    // todoList Routes
    // app.route('/profile')
    //     .post(userHandlers.loginRequired, userHandlers.profile);


    app.route('/auth/signUp').post(userHandlers.signUp);

    app.route('/auth/signIn')
        .post(userHandlers.signIn);

    
};