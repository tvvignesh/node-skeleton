let config = require('../../config/config');
import { log } from '../utils/error.utils';

import { signJWT, verifyJWT } from '../utils/auth.utils';

/**
 * AUTHENTICATION MIDDLEWARE FUNCTION
 */
export const authenticate = function(req, res, next) {
    if (req.headers.authorization === config.authorization) {
        next();
    } else {
        return res.status(400).jsonp({
            message:
                'You may be unauthorized to do this request! Please add the token'
        });
    }
};

/**
 * Resolve JWT Token Middleware to find the User info
 * @param req
 * @param res
 * @param next
 */
export const resolveToken = function(req, res, next) {
    let token = req.headers.authorization;

    let decoded = verifyJWT(token, {});

    if (!decoded) {
        return res.status(401).send({
            message: 'Invalid access. Sign in / validate your token'
        });
    }

    // Use the decoded object (retrieved from JWT) to fetch the user from the DB

    let shouldAllow = true;

    // Remove this console once this portion is modified
    log('info', {
        message: 'Resolving token',
        decoded: decoded
    });

    if (shouldAllow) {
        next();
    } else {
        return res.status(401).send({
            message: 'Invalid access.'
        });
    }
};

/**
 * Resolve JWT Secret to identify access rights
 * @param req
 * @param res
 * @param next
 */
export const resolveSecret = function(req, res, next) {
    let secret = req.headers.secret;

    // Modify this to add your own verification from the DB. If success, allow

    let shouldAllow = true;

    if (shouldAllow && secret) {
        next();
    } else {
        return res.status(401).send({
            message: 'Invalid access.'
        });
    }
};

/**
 * Generate JWT API Credentials after signing - Token & Secret
 * @param req
 * @param res
 */
export const generateAPICredentials = function(req, res) {
    // When generating do a check to see if the user is allowed to have access to the API

    let shouldAllow = true;

    if (shouldAllow) {
        let token = signJWT(req.body, {});

        // Secret generation should be done for every tenant
        // Once generated, secret can be stored/retrieved from DB

        return res.status(200).jsonp({
            token: token
        });
    }

    return res.status(500).jsonp({
        error: 'Cannot read end point credentials'
    });
};
