// let config = require('../../config/config');
const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
const register = new client.Registry();

/**
 * COLLECT DEFAULT METRICS FOR THE PROCESS
 * https://prometheus.io/docs/instrumenting/writing_clientlibs/#standard-and-runtime-collectors
 */

collectDefaultMetrics({
    timeout: 5000,
    register: register
});

/**
 * METRIC DEFINITIONS
 */

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

/**
 * INITIALIZE METRICS
 */
const initCounters = function() {
    testCounter.inc(
        {
            label1: 'Test Label'
        },
        0
    );

    testGauge.set(0);

    testHistogram.reset();

    testSummary.reset();
};

initCounters();

const mergedRegistries = client.Registry.merge([register, client.register]);

export const getMetrics = function(req, res) {
    res.set('Content-Type', mergedRegistries.contentType);
    res.end(mergedRegistries.metrics());
};
