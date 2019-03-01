const reduce = require("lodash/reduce");

const configUtils = require("./config-utils");

module.exports = exports = {
    logs: ["error", "info", "log"],
    log: function () {
        const verbose = configUtils.readConfig(true).verbose || "error";
        this.weight("log") <= this.weight(verbose) && console.log(this.reduce(arguments));
    },
    info: function () {
        const verbose = configUtils.readConfig(true).verbose || "error";
        this.weight("info") <= this.weight(verbose) && console.info(this.reduce(arguments));
    },
    error: function () {
        const verbose = configUtils.readConfig(true).verbose || "error";
        this.weight("error") <= this.weight(verbose) && console.error(this.reduce(arguments)) && process.exit(1);
    },
    reduce: function (args) {
        return reduce(args, function (arg, msg) {
            return arg + (arg === "" ? "" : " ") + msg;
        }, "");
    },
    weight: function (log) {
        return this.logs.indexOf(log);
    }
};
