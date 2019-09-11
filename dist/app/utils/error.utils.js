"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Tags } = require('opentracing');
const config_1 = require("../../config/config");
const logger = require('winston');
let transports = [];
let dateStr = new Date().toISOString();
if (config_1.config.toggle.log.files) {
    transports.push(new logger.transports.File({
        filename: 'logs/' + dateStr + '-error.log',
        level: 'error'
    }));
    transports.push(new logger.transports.File({
        filename: 'logs/' + dateStr + '-info.log',
        level: 'info'
    }));
}
if (config_1.config.toggle.log.console) {
    transports.push(new logger.transports.Console());
}
logger.configure({
    transports: transports
});
exports.log = function (level, payload, span = undefined, tagObj = undefined) {
    if (span && tagObj) {
        for (let tag in tagObj) {
            if (Object.prototype.hasOwnProperty.call(tagObj, tag)) {
                span.setTag(tag, tagObj[tag]);
            }
        }
    }
    if (span && level === 'error') {
        span.setTag(Tags.ERROR, true);
    }
    logger.log(level, JSON.stringify(payload));
    if (span) {
        span.log(payload);
    }
};
//# sourceMappingURL=error.utils.js.map