const merge = require("lodash/merge");

const keyValue = require("./utils").keyValue;
const configUtils = require("./utils").configUtils;


module.exports = function (action, data) {
    let configData = configUtils.readConfig();
    switch (action) {
        case "set":
            configData = merge(configData, keyValue(data));
            configUtils.writeConfig(configData);
            break;
        case "get":
            const value = configData[data];
            console.log(data + "=" + (value || "Undefined"));
            break;
    }
};
