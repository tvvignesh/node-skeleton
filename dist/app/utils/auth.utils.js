'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path'), fs = require('fs');
const jwt = require('jsonwebtoken');
let config = require('../../config/config');
let privateKEY = fs.readFileSync(path.join(__dirname, '../../../creds/jwtRS512.key'), 'utf8'), publicKEY = fs.readFileSync(path.join(__dirname, '../../../creds/jwtRS512.key.pub'), 'utf8');
exports.signJWT = function (payload, $Options) {
    let signOptions = {
        issuer: $Options.issuer || config.jwt.issuer,
        expiresIn: '30d',
        algorithm: 'RS512',
        subject: $Options.subject || undefined,
        audience: $Options.audience || undefined
    };
    return jwt.sign(payload, privateKEY, signOptions);
};
exports.verifyJWT = function (token, $Options) {
    let verifyOptions = {
        issuer: $Options.issuer || config.jwt.issuer,
        subject: $Options.subject || undefined,
        audience: $Options.audience || undefined,
        expiresIn: '30d',
        algorithm: ['RS512']
    };
    try {
        return jwt.verify(token, publicKEY, verifyOptions);
    }
    catch (err) {
        return false;
    }
};
exports.decodeJWT = function (token) {
    return jwt.decode(token, { complete: true });
};
//# sourceMappingURL=auth.utils.js.map