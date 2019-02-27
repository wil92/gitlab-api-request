const verbose = process.env['GL_VERBOSE'] || 'error';

module.exports = exports = {
    logs: ['error', 'info', 'log'],
    log: function (msg) {
        this.weight('log') <= this.weight(verbose) && console.log(msg);
    },
    info: function (msg) {
        this.weight('info') <= this.weight(verbose) && console.info(msg);
    },
    error: function (msg) {
        this.weight('error') <= this.weight(verbose) && console.error(msg);
    },
    weight: function (log) {
        return this.logs.indexOf(log) === -1 ? this.logs.length : this.logs.indexOf(log);
    }
};
