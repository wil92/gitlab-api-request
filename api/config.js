const merge = require("lodash/merge");
const isNil = require("lodash/isNil");

const keyValue = require("./utils").keyValue;
const configUtils = require("./utils").configUtils;
const gl = require("./utils").logs;


module.exports = function (action, data) {
    let configData = configUtils.readConfig();
    switch (action) {
        case "help":
            help();
            break;
        case "set":
            if (isNil(data)) {
                emptyData();
                break;
            }
            configData = merge(configData, keyValue(data));
            configUtils.writeConfig(configData);
            break;
        case "get":
            if (isNil(data)) {
                emptyData();
                break;
            }
            const value = configData[data];
            console.log(data + "=" + (value || "Undefined"));
            break;
    }
};

function emptyData() {
    gl.error("[data] can't be empty");
}

function help() {
    console.log("gr global configurations.\n\tUsage:\n\tgr config help\n\t\t  set <config-name>=<config-value>\n\t\t  get <config-name>");
    console.log("Actions information");
    console.log("\thelp: output config usage information");
    console.log("\tset: set global configuration parameter\n\t\tExample: gr config set token=\"MY_TOKEN\"");
    console.log("\tget: get global configuration parameter\n\t\tExample: gr config get token");
}
