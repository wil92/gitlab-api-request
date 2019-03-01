/**
 * issues api module
 * @module api/issues
 */

const merge = require("lodash/merge");

const utils = require("./utils");

const mergeQueryParams = utils.queryParamsUtils.mergeQueryParams;
const argsToQueries = utils.queryParamsUtils.argsToQueries;
const gl = utils.logs;
const makeRequest = require("./utils/api-request").makeRequest;
const configUtils = require("./utils/config-utils");


/**
 * Issues constructor
 * @param action {'list' | 'my-estimations'} action to execute
 * @param queries {string[]} list of query params
 */
module.exports = function (action, queries) {
    module.exports.gitlabUrlApi = configUtils.readConfig(true).url || "https://gitlab.com";
    module.exports.apiVersion = `/api/${configUtils.readConfig(true).apiVersion || "v4"}`;

    if (action) {
        switch (action) {
            case "list":
                module.exports.list(argsToQueries(queries));
                break;
            case "my-estimations":
                module.exports.myEstimations(argsToQueries(queries));
                break;
            default:
                gl.error("Not valid action, the actions are [list, my-estimations]");
        }
    }
};

/**
 * Gitlab api url
 * @type {string}
 */
module.exports.gitlabUrlApi = "";
/**
 * Gitlab api version
 * @type {string}
 */
module.exports.apiVersion = "";
/**
 * Gitlab api resource url
 * @type {string}
 */
module.exports.apiEndpoint = "/issues";

/**
 * List of issues
 *
 * @param queryParams {{}}
 * @param callback?
 */
module.exports.list = function (queryParams, callback) {
    const url = `${module.exports.gitlabUrlApi}${module.exports.apiVersion}${module.exports.apiEndpoint}?${mergeQueryParams(queryParams)}`;
    const options = {url, headers: {"PRIVATE-TOKEN": configUtils.readConfig(true).token || ""}};

    gl.info(url);
    makeRequest(options, callback || module.exports.showList);
};

/**
 * List of issues assigned to the user
 *
 * @param queryParams {{}}
 * @param callback?
 */
module.exports.myEstimations = function (queryParams, callback) {
    queryParams = merge(queryParams, {"scope": "assigned_to_me"});
    const url = `${module.exports.gitlabUrlApi}${module.exports.apiVersion}${module.exports.apiEndpoint}?${mergeQueryParams(queryParams)}`;
    const options = {url, headers: {"PRIVATE-TOKEN": configUtils.readConfig(true).token || ""}};

    gl.info(url);
    makeRequest(options, callback || module.exports.calculate);
};

/**
 * Show in `console.log` the list of issues
 *
 * @param infoData body from server
 */
module.exports.showList = function showList(infoData) {
    console.log("List of issues");
    console.log(infoData);
};

/**
 * Show in `console.log` the estimated, spend and issues of the current user
 *
 * @param infoData body from server
 */
module.exports.calculate = function calculate(infoData) {
    let estimateTime = 0;
    let issues = 0;
    let spentTime = 0;

    infoData.forEach((data) => {
        estimateTime += data["time_stats"] && data["time_stats"]["time_estimate"] || 0;
        spentTime += data["time_stats"] && data["time_stats"]["total_time_spent"] || 0;
        issues++;
    });

    console.log("Estimate", estimateTime / 3600);
    console.log("Spent", spentTime / 3600);
    console.log("Issues", issues);
};
