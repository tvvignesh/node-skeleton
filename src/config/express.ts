'use strict';

/**
 * Module dependencies.
 */

let fs = require('fs'),
    http = require('http'),
    https = require('https'),
    path = require('path');

let express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    helmet = require('helmet'),
    mustacheExpress = require('mustache-express'),
    xss = require('xss-clean'),
    swaggerUi = require('swagger-ui-express'),
    YAML = require('yamljs'),
    glob = require('glob');

import { config } from '../config/config';
import { log } from '../app/utils/error.utils';

// let schema = require('../schema/schema').schema;

// import {schema as schema} from '../schema/schema';

module.exports = function() {
    // Initialize express app
    let app = express();

    // Setting application local variables
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;

    // Passing the request url to environment locals
    app.use(function(req, res, next) {
        if (config.app.url) {
            app.locals.url = config.app.url + ':' + config.port;
        } else {
            res.locals.url = req.protocol + '://' + req.headers.host + req.url;
        }
        next();
    });

    // Showing stack errors
    app.set('showStackError', true);

    // Config View Engine
    app.engine('server.view.html', mustacheExpress());
    app.set('view engine', 'server.view.html');
    app.set('views', path.join(__dirname, '../app/views/'));

    // Environment dependent middleware
    if (process.env.NODE_ENV === 'development') {
        let morgan = require('morgan');
        // Enable logger (morgan)
        app.use(morgan('dev'));

        // Disable views cache
        app.set('view cache', false);
    } else if (process.env.NODE_ENV === 'production') {
        app.locals.cache = 'memory';
    } else if (process.env.NODE_ENV === 'alpha') {
        app.locals.cache = 'memory';
    } else if (process.env.NODE_ENV === 'secure') {
        let morgan = require('morgan');
        app.use(morgan('dev'));
    }

    // Request body parsing middleware should be above methodOverride
    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );
    app.use(bodyParser.json());
    app.use(xss());
    app.use(methodOverride());

    // Use helmet to secure Express headers
    // app.use(helmet.frameguard());
    app.use(
        helmet({
            frameguard: false
        })
    );
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.ieNoOpen());
    app.disable('x-powered-by');

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        res.removeHeader('X-Frame-Options');
        next();
    });

    app.set('jsonp callback', true);

    if (config.toggle.apidoc) {
        const swaggerDocument = YAML.load(
            path.join(__dirname, '../../apidoc.yaml')
        );
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    // Globbing routing files
    glob.sync('./**/routes/**/*.js').forEach(function(routePath) {
        require(path.resolve(routePath))(app);
    });

    // config.getGlobbedFiles('./**/routes/**/*.js').forEach(function(routePath) {
    //     require(path.resolve(routePath))(app);
    // });

    // Config Public Folder for Static Content
    app.use(express.static(path.join(__dirname, '../app/public')));

    // Assume 404 since no middleware responded
    app.use(function(req, res) {
        log('error', {
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
        // Log SSL usage
        console.log('Securely using https protocol');

        // Load SSL key and certificate
        let privateKey = fs.readFileSync('./config/sslcerts/key.pem', 'utf8');
        let certificate = fs.readFileSync('./config/sslcerts/cert.pem', 'utf8');

        // Create HTTPS Server
        server = https.createServer(
            {
                key: privateKey,
                cert: certificate
            },
            app
        );
    } else {
        server = http.createServer(app);
    }

    app.set('server', server);

    // Return Express server instance
    return app;
};

export {};
