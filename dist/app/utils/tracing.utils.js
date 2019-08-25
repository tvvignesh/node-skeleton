"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initJaegerTracer = require('jaeger-client').initTracer;
const config = require('../../config/config');
const { FORMAT_HTTP_HEADERS } = require('opentracing');
const error_utils_1 = require("./error.utils");
exports.initTracer = function (serviceName, projectName = config.app.title, headers = {}) {
    const tracerConfig = {
        serviceName: serviceName,
        reporter: {
            agentHost: config.jaeger.host,
            agentPort: config.jaeger.port,
            logSpans: true
        },
        sampler: {
            type: 'probabilistic',
            param: 1.0
        }
    };
    const options = {
        logger: {
            info(msg) {
                error_utils_1.log('info', {
                    payload: msg
                });
            },
            error(msg) {
                error_utils_1.log('error', {
                    payload: msg
                });
            }
        }
    };
    global['tracer'] = initJaegerTracer(tracerConfig, options);
    let parentSpan;
    if (Object.keys(headers).length === 0) {
        parentSpan = global['tracer'].startSpan(projectName);
    }
    else {
        const parentSpanContext = global['tracer'].extract(FORMAT_HTTP_HEADERS, headers);
        parentSpan = global['tracer'].startSpan(projectName, {
            childOf: parentSpanContext
        });
    }
    return parentSpan;
};
exports.startSpan = function (tag, options = {}) {
    if (!global['tracer']) {
        global['tracer'] = exports.initTracer('ml-platform');
    }
    return global['tracer'].startSpan(tag, options);
};
//# sourceMappingURL=tracing.utils.js.map