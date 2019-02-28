const merge = require("lodash/merge");

const utils = require("./utils");

const mergeQueryParams = utils.queryParamsUtils.mergeQueryParams;
const argsToQueries = utils.queryParamsUtils.argsToQueries;
const gl = utils.logs;
const makeRequest = require("./utils/api-request").makeRequest;


module.exports = function (action, queries) {
    module.exports.gitlabUrlApi = process.env["GL_URL"] || "https://gitlab.com";
    module.exports.apiVersion = `/api/${process.env["GL_API_VERSION"] || "v4"}`;

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

module.exports.gitlabUrlApi = "";
module.exports.apiVersion = "";
module.exports.apiEndpoint = "/issues";

/**
 * List of issues
 *
 * @see ./utils/api-request
 * @param queryParams {{string[]: string[]}}
 * @param callback? {function (responseBody: Object)}
 */
module.exports.list = function (queryParams, callback) {
    const url = `${module.exports.gitlabUrlApi}${module.exports.apiVersion}${module.exports.apiEndpoint}?${mergeQueryParams(queryParams)}`;
    const options = {url, headers: {"PRIVATE-TOKEN": process.env["GL_TOKEN"] || ""}};

    gl.info(url);
    makeRequest(options, callback || module.exports.showList);
};

module.exports.myEstimations = function (queryParams, callback) {
    queryParams = merge(queryParams, {"scope": "assigned_to_me"});
    const url = `${module.exports.gitlabUrlApi}${module.exports.apiVersion}${module.exports.apiEndpoint}?${mergeQueryParams(queryParams)}`;
    const options = {url, headers: {"PRIVATE-TOKEN": process.env["GL_TOKEN"] || ""}};

    gl.info(url);
    makeRequest(options, callback || module.exports.calculate);
};

module.exports.showList = function showList(infoData) {
    console.log("List of issues");
    console.log(infoData);
};

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
