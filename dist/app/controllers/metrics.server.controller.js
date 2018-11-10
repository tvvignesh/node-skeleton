"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
const register = new client.Registry();
collectDefaultMetrics({
    timeout: 5000,
    register: register
});
const testCounter = new client.Counter({
    name: 'counterName',
    help: 'counterHelp',
    labelNames: ['label1', 'label2'],
    registers: [register]
});
const testGauge = new client.Gauge({
    name: 'gaugeName',
    help: 'gaugeHelp',
    registers: [register]
});
const testHistogram = new client.Histogram({
    name: 'histogramName',
    help: 'histogramHelp',
    labelNames: ['label1'],
    buckets: [0.1, 5, 15, 50, 100, 500]
});
const testSummary = new client.Summary({
    name: 'summaryName',
    help: 'summaryHelp'
});
const initCounters = function () {
    testCounter.inc({
        label1: 'Test Label'
    }, 0);
    testGauge.set(0);
    testHistogram.reset();
    testSummary.reset();
};
initCounters();
const mergedRegistries = client.Registry.merge([register, client.register]);
exports.getMetrics = function (req, res) {
    res.set('Content-Type', mergedRegistries.contentType);
    res.end(mergedRegistries.metrics());
};
//# sourceMappingURL=metrics.server.controller.js.map