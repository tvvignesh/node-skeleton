if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
}
let config = require('./config/config');
let app = require('./config/express')();
process.on('uncaughtException', function (err) {
    console.log('Error:', err);
});
app.get('server').listen(config.port, config.hostname);
exports = module.exports = app;
console.log(`${config.app.title} started on ${config.hostname} : ${config.port} in ${process.env.NODE_ENV} mode on ${new Date().toISOString()}`);
//# sourceMappingURL=server.js.map