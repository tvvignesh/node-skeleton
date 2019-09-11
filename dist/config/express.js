'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
let fs = require('fs'), http = require('http'), https = require('https'), path = require('path');
let express = require('express'), bodyParser = require('body-parser'), methodOverride = require('method-override'), helmet = require('helmet'), mustacheExpress = require('mustache-express'), xss = require('xss-clean'), swaggerUi = require('swagger-ui-express'), YAML = require('yamljs'), glob = require('glob');
const config_1 = require("../config/config");
const error_utils_1 = require("../app/utils/error.utils");
module.exports = function () {
    let app = express();
    app.locals.title = config_1.config.app.title;
    app.locals.description = config_1.config.app.description;
    app.use(function (req, res, next) {
        if (config_1.config.app.url) {
            app.locals.url = config_1.config.app.url + ':' + config_1.config.port;
        }
        else {
            res.locals.url = req.protocol + '://' + req.headers.host + req.url;
        }
        next();
    });
    app.set('showStackError', true);
    app.engine('server.view.html', mustacheExpress());
    app.set('view engine', 'server.view.html');
    app.set('views', path.join(__dirname, '../app/views/'));
    if (process.env.NODE_ENV === 'development') {
        let morgan = require('morgan');
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
        let morgan = require('morgan');
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
    if (config_1.config.toggle.apidoc) {
        const swaggerDocument = YAML.load(path.join(__dirname, '../../apidoc.yaml'));
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
    glob.sync('./**/routes/**/*.js').forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });
    app.use(express.static(path.join(__dirname, '../app/public')));
    app.use(function (req, res) {
        error_utils_1.log('error', {
            message: 'Page Not Found - ' + req.url,
            payload: req.body || req.query
        });
        res.render(path.join(__dirname, '../app/views/error/404'), {
            head: {
                title: 'Page Not Found'
            },
            content: {
                title: 'OOPS!',
                description: 'Page Not Found. Error Code: 404'
            }
        });
    });
    let server;
    if (process.env.NODE_ENV === 'secure') {
        console.log('Securely using https protocol');
        let privateKey = fs.readFileSync('./config/sslcerts/key.pem', 'utf8');
        let certificate = fs.readFileSync('./config/sslcerts/cert.pem', 'utf8');
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