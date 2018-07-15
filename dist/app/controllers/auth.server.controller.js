var config = require('../../config/config');
exports.authenticate = function (req, res, next) {
    if (req.headers.authorization === config.authorization) {
        next();
    }
    else {
        return res.status(400).jsonp({ message: 'You may be unauthorized to do this request! Please add the token' });
    }
};
//# sourceMappingURL=auth.server.controller.js.map