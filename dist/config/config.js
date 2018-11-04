'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash'), glob = require('glob');
module.exports = _.extend(require('./env/all'), require('./env/' + process.env.NODE_ENV) || {});
module.exports.getGlobbedFiles = function (globPatterns, removeRoot) {
    let _this = this;
    let urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');
    let output = [];
    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function (globPattern) {
            output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
        });
    }
    else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        }
        else {
            let files = glob.sync(globPatterns);
            if (removeRoot) {
                files = files.map(function (file) {
                    return file.replace(removeRoot, '');
                });
            }
            output = _.union(output, files);
        }
    }
    return output;
};
//# sourceMappingURL=config.js.map