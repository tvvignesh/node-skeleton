var logger = require('winston');

var now = new Date ();
var dateStr = now.toISOString();

logger.configure({
  transports: [
    new (logger.transports.File)({ filename: 'logs/'+dateStr+'.log' })
  ]
});

module.exports = logger;
