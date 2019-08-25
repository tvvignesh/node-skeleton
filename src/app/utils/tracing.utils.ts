const initJaegerTracer = require('jaeger-client').initTracer;
const config = require('../../config/config');
const { FORMAT_HTTP_HEADERS } = require('opentracing');
import { log } from './error.utils';

/**
 * @param serviceName
 */
export const initTracer = function(
    serviceName,
    projectName = config.app.title,
    headers = {}
) {
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
                log('info', {
                    payload: msg
                });
            },
            error(msg) {
                log('error', {
                    payload: msg
                });
            }
        }
    };

    global['tracer'] = initJaegerTracer(tracerConfig, options);

    let parentSpan;

    if (Object.keys(headers).length === 0) {
        parentSpan = global['tracer'].startSpan(projectName);
    } else {
        const parentSpanContext = global['tracer'].extract(
            FORMAT_HTTP_HEADERS,
            headers
        );

        parentSpan = global['tracer'].startSpan(projectName, {
            childOf: parentSpanContext
        });
    }

    return parentSpan;
};

export const startSpan = function(tag, options = {}) {
    if (!global['tracer']) {
        global['tracer'] = initTracer('ml-platform');
    }
    return global['tracer'].startSpan(tag, options);
};
