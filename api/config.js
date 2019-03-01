const merge = require("lodash/merge");
const isNil = require("lodash/isNil");

const keyValue = require("./utils").keyValue;
const configUtils = require("./utils").configUtils;
const gl = require("./utils").logs;


module.exports = function (action, data) {
    let configData = configUtils.readConfig();
    switch (action) {
        case "help":
            module.exports.help();
            break;
        case "set":
            if (isNil(data)) {
                module.exports.emptyData();
                break;
            }
            configData = merge(configData, keyValue(data));
            configUtils.writeConfig(configData);
            break;
        case "get":
            if (isNil(data)) {
                module.exports.emptyData();
                break;
            }
            const value = configData[data];
            console.log(value || "Undefined");
            break;
        case "unset":
            if (isNil(data)) {
                module.exports.emptyData();
                break;
            }
            !isNil(configData[data]) && delete configData[data];
            configUtils.writeConfig(configData);
            break;
    }
};

module.exports.emptyData = function () {
    gl.error("[data] can't be empty");
};

module.exports.help = function () {
    console.log("gr global configurations.\n\tUsage:\n\tgr config help\n\t\t  set <config-name>=<config-value>\n\t\t  unset <config-name>\n\t\t  get <config-name>");
    console.log("Actions information");
    console.log("\thelp: output config usage information");
    console.log("\tset: set global configuration parameter\n\t\tExample: gr config set token=\"MY_TOKEN\"");
    console.log("\tunset: unset global configuration parameter\n\t\tExample: gr config unset token");
    console.log("\tget: get global configuration parameter\n\t\tExample: gr config get token");
};
