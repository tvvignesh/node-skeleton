'use strict';
var fs = require('fs'), http = require('http'), https = require('https'), express = require('express'), morgan = require('morgan'), bodyParser = require('body-parser'), methodOverride = require('method-override'), helmet = require('helmet'), config = require('./config'), path = require('path'), xss = require('xss-clean'), logger = require('winston');
var schema = require('../schema/schema').schema;
module.exports = function (db) {
    var app = express();
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.use(function (req, res, next) {
        if (config.app.url) {
            app.locals.url = config.app.url + ':' + config.port;
        }
        else {
            res.locals.url = req.protocol + '://' + req.headers.host + req.url;
        }
        next();
    });
    app.set('showStackError', true);
    app.set("view engine", "pug");
    app.set("views", path.join(__dirname, "../app/views"));
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
        app.set('view cache', false);
    }
    else if (process.env.NODE_ENV === 'production') {
        app.locals.cache = 'memory';
    }
    else if (process.env.NODE_ENV === 'alpha') {
        app.locals.cache = 'memory';
    }
    else if (process.env.NODE_ENV === 'secure') {
        app.use(morgan('dev'));
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(xss());
    app.use(methodOverride());
    app.use(helmet({
        frameguard: false
    }));
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.ieNoOpen());
    app.disable('x-powered-by');
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.removeHeader('X-Frame-Options');
        next();
    });
    app.set('jsonp callback', true);
    config.getGlobbedFiles('./**/routes/**/*.js').forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });
    app.use(function (err, req, res, next) {
        if (!err)
            return next();
        console.error(err.stack);
        logger.log('error', 'Internal server error - ' + err.stack, err);
        res.status(500).render('500', {
            error: err.stack
        });
    });
    app.use(function (req, res) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not Found'
        });
    });
    var server;
    if (process.env.NODE_ENV === 'secure') {
        console.log('Securely using https protocol');
        var privateKey = fs.readFileSync('./config/sslcerts/key.pem', 'utf8');
        var certificate = fs.readFileSync('./config/sslcerts/cert.pem', 'utf8');
        server = https.createServer({
            key: privateKey,
            cert: certificate
        }, app);
    }
    else {
        server = http.createServer(app);
    }
    app.set('server', server);
    return app;
};
//# sourceMappingURL=express.js.map