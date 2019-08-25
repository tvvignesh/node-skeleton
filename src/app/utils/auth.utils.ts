'use strict';

const path = require('path'),
    fs = require('fs');

const jwt = require('jsonwebtoken');

let config = require('../../config/config');

let privateKEY = fs.readFileSync(
        path.join(__dirname, '../../../creds/jwtRS512.key'),
        'utf8'
    ),
    publicKEY = fs.readFileSync(
        path.join(__dirname, '../../../creds/jwtRS512.key.pub'),
        'utf8'
    );

export const signJWT = function(payload, $Options) {
    /*
     sOptions = {
      issuer: "Authorizaxtion/Resource/This server",
      subject: "username@example.com",
      audience: "Client_Identity" // this should be provided by client
     }
    */
    // Token signing options
    let signOptions = {
        issuer: $Options.issuer || config.jwt.issuer,
        expiresIn: '30d', // 30 days validity
        algorithm: 'RS512',
        subject: $Options.subject || undefined,
        audience: $Options.audience || undefined
    };

    return jwt.sign(payload, privateKEY, signOptions);
};

export const verifyJWT = function(token, $Options) {
    /*
     vOption = {
      issuer: "Authorization/Resource/This server",
      subject: "username@example.com",
      audience: "Client_Identity" // this should be provided by client
     }
    */
    let verifyOptions = {
        issuer: $Options.issuer || config.jwt.issuer,
        subject: $Options.subject || undefined,
        audience: $Options.audience || undefined,
        expiresIn: '30d',
        algorithm: ['RS512']
    };

    try {
        return jwt.verify(token, publicKEY, verifyOptions);
    } catch (err) {
        return false;
    }
};

export const decodeJWT = function(token) {
    return jwt.decode(token, { complete: true });
    // returns null if token is invalid
};
