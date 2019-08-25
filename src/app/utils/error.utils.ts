const { Tags } = require('opentracing');
const config = require('../../config/config');
const logger = require('winston');

let transports = [];

let dateStr = new Date().toISOString();

if(config.toggle.log.files) {
	transports.push(new (logger.transports.File)({ filename: 'logs/' + dateStr + '-error.log', level: 'error' }));
	transports.push(new (logger.transports.File)({ filename: 'logs/' + dateStr + '-warn.log', level: 'warn' }));
	transports.push(new (logger.transports.File)({ filename: 'logs/' + dateStr + '-warn.log', level: 'info' }));
}

if(config.toggle.log.console) {
	transports.push(new logger.transports.Console());
}

/**
 * @param serviceName
 */
export const log = function (level, payload, span = undefined, tagObj = undefined) {

	if (span && tagObj) {
		for (let tag in tagObj) {
			span.setTag(tag, tagObj[tag]);
		}
	}

	if (level === "error") {
		span.setTag(Tags.ERROR, true);
	}

	logger.log(level, JSON.stringify(payload));

    if (span) {
        span.log(payload);
    }
};
