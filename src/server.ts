require('dotenv').config();

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
}

import { config } from './config/config';

// Init the express application
let app = require('./config/express')();

process.on('uncaughtException', function(err) {
    console.log('Error:', err);
});

// Start the app by listening on <port>
app.get('server').listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log(
    `${config.app.title} started on ${config.hostname} : ${config.port} in ${
        process.env.NODE_ENV
    } mode on ${new Date().toISOString()}`
);
