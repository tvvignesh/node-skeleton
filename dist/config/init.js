'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
let glob = require('glob'), chalk = require('chalk');
module.exports = function () {
    let environmentFiles = glob.sync('./config/env/' + process.env.NODE_ENV + '.js');
    if (!environmentFiles.length) {
        if (process.env.NODE_ENV) {
            console.error(chalk.red('No configuration file found for "' +
                process.env.NODE_ENV +
                '" environment using development instead'));
        }
        else {
            console.error(chalk.red('NODE_ENV is not defined! Using default development environment'));
        }
        process.env.NODE_ENV = 'development';
    }
    else {
        console.log(chalk.black.bgWhite('Application loaded using the "' +
            process.env.NODE_ENV +
            '" environment configuration'));
    }
};
//# sourceMappingURL=init.js.map