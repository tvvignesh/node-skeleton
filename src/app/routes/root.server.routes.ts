'use strict';

module.exports = function(app) {
    // var authCtrl = require('../../app/controllers/auth.server.controller');

    app.get('/', function(req, res) {
        res.render('index', {
            head: {
                title: 'Hello World'
            },
            content: {
                title: 'Hi there!',
                description: 'You are all set up'
            }
        });
    });

    // Set params if needed
    // app.param('Id', apiCtrl.func);
};
