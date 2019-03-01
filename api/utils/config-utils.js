const os = require("os");
const fs = require("fs");
const path = require("path");

const TOML = require("@iarna/toml");
const forEach = require("lodash/forEach");
const merge = require("lodash/merge");

const homedir = os.homedir();
const configFilePath = path.resolve(homedir, ".grconfig");

module.exports.readConfig = function (mergeWithEnv) {
    mergeWithEnv = true;
    const configString = fs.existsSync(configFilePath) ? fs.readFileSync(configFilePath, "utf8") : null;
    let configData = configString ? TOML.parse(configString) : {};
    mergeWithEnv && (configData = merge(configData, envConfigs()));
    return configData;
};

module.exports.writeConfig = function (config) {
    fs.writeFileSync(configFilePath, TOML.stringify(config), {flag: "w", encoding: "utf8"});
};

function envConfigs() {
    forEach(process.env, function (value, key) {
        if (key.startsWith("GR_")) {
            console.log(key, value);
        }
    });
}
