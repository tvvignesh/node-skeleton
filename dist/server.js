"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
}
const config_1 = require("./config/config");
let app = require('./config/express')();
process.on('uncaughtException', function (err) {
    console.log('Error:', err);
});
app.get('server').listen(config_1.config.port);
exports = module.exports = app;
console.log(`${config_1.config.app.title} started on ${config_1.config.hostname} : ${config_1.config.port} in ${process.env.NODE_ENV} mode on ${new Date().toISOString()}`);
//# sourceMappingURL=server.js.map