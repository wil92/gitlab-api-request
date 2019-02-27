const reduce = require('lodash/reduce');

const verbose = process.env['GL_VERBOSE'] || 'error';

module.exports = exports = {
    logs: ['error', 'info', 'log'],
    log: function () {
        this.weight('log') <= this.weight(verbose) && console.log(this.reduce(arguments));
    },
    info: function () {
        this.weight('info') <= this.weight(verbose) && console.info(this.reduce(arguments));
    },
    error: function () {
        this.weight('error') <= this.weight(verbose) && console.error(this.reduce(arguments));
        process.exit(1);
    },
    reduce: function (args) {
        return reduce(args, function (arg, msg) {
            return arg + (arg === '' ? '' : ' ') + msg;
        }, '');
    },
    weight: function (log) {
        return this.logs.indexOf(log) === -1 ? this.logs.length : this.logs.indexOf(log);
    }
};
