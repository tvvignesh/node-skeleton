'use strict';

module.exports = {
    app: {
        title: 'Skeleton server',
        description: 'Skeleton server boilerplate',
        url: 'http://localhost'
    },
    port: process.env.NODEJS_PORT || 8081,
    hostname: process.env.NODEJS_IP || 'localhost'
};
