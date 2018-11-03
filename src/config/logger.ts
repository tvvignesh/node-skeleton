const logger = require('winston');

let now = new Date();
let dateStr = now.toISOString();

logger.configure({
    transports: [
        new (logger.transports.File)({ filename: 'logs/' + dateStr + '.log' })
    ]
});

module.exports = logger;

export { };