'use strict';


module.exports = function(app) {
  // var authCtrl = require('../../app/controllers/auth.server.controller');

  app.get('/', function (req, res) {
    res.send('Hello world!');
  });

  // Finish with setting up the companyId param
  //app.param('Id', apiCtrl.func);

};
