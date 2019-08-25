const axios = require('axios');
import { log } from './error.utils';
const { FORMAT_HTTP_HEADERS } = require('opentracing');

/**
 * Make an API Call by passing the payload and inject Tracing headers and context in the process
 * @param url
 * @param payload
 * @param auth
 * @param span
 * @param method
 */
export const apiCall = async function(apiOptions, span) {
    let apiCallSpan = global['tracer'].startSpan('api-call', { childOf: span });

    try {
        apiOptions.headers = apiOptions.headers || {
            Accept: 'application/json;charset=UTF-8'
        };

        apiOptions.responseType = apiOptions.responseType || 'json';

        apiOptions.method = apiOptions.method || 'POST';

        global['tracer'].inject(
            apiCallSpan,
            FORMAT_HTTP_HEADERS,
            apiOptions.headers
        );

        log('info', {
            msg: 'Routing',
            url: apiOptions.url
        });

        let response = await axios(apiOptions);

        apiCallSpan.finish();

        return {
            err: null,
            response: response.data,
            span: apiCallSpan
        };
    } catch (err) {
        log(
            'error',
            {
                message: 'Error in routing url',
                url: apiOptions.url,
                err: err
            },
            apiCallSpan
        );

        apiCallSpan.finish();

        return {
            err: err,
            response: null,
            span: apiCallSpan
        };
    }
};
