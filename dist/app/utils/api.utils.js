"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
const error_utils_1 = require("./error.utils");
const { FORMAT_HTTP_HEADERS } = require('opentracing');
exports.apiCall = function (apiOptions, span) {
    return __awaiter(this, void 0, void 0, function* () {
        let apiCallSpan = global['tracer'].startSpan('api-call', { childOf: span });
        try {
            apiOptions.headers = apiOptions.headers || {
                Accept: 'application/json;charset=UTF-8'
            };
            apiOptions.responseType = apiOptions.responseType || 'json';
            apiOptions.method = apiOptions.method || 'POST';
            global['tracer'].inject(apiCallSpan, FORMAT_HTTP_HEADERS, apiOptions.headers);
            error_utils_1.log('info', {
                msg: 'Routing',
                url: apiOptions.url
            });
            let response = yield axios(apiOptions);
            apiCallSpan.finish();
            return {
                err: null,
                response: response.data,
                span: apiCallSpan
            };
        }
        catch (err) {
            error_utils_1.log('error', {
                message: 'Error in routing url',
                url: apiOptions.url,
                err: err
            }, apiCallSpan);
            apiCallSpan.finish();
            return {
                err: err,
                response: null,
                span: apiCallSpan
            };
        }
    });
};
//# sourceMappingURL=api.utils.js.map