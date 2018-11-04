"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let config = require('../../config/config');
const authenticate = function (req, res, next) {
    if (req.headers.authorization === config.authorization) {
        next();
    }
    else {
        return res.status(400).jsonp({
            message: 'You may be unauthorized to do this request! Please add the token'
        });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.server.controller.js.map