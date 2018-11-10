'use strict';
module.exports = {
    app: {
        title: 'Node Skeleton',
        description: 'Node Skeleton',
        url: 'http://localhost:8085'
    },
    port: process.env.NODEJS_PORT || 8085,
    hostname: process.env.NODEJS_IP || 'localhost',
    authorization: 'mysecrettoken',
    jwt: {
        issuer: process.env.JWT_ISSUER || 'node-skeleton'
    },
    toggle: {
        apidoc: process.env.TOGGLE_APIDOC || true
    },
    db: {
        mssql: {
            root: {
                user: '',
                password: '',
                server: '',
                database: '',
                options: {
                    trustedConnection: false
                }
            }
        }
    }
};
//# sourceMappingURL=alpha.js.map