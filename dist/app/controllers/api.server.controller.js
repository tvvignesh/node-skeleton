"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helloWorld = function (req, res) {
    return res.status(200).jsonp({
        message: 'Hello World.'
    });
};
exports.helloWorld = helloWorld;
//# sourceMappingURL=api.server.controller.js.map