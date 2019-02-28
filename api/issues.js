const merge = require("lodash/merge");

const utils = require("./utils");

const mergeQueryParams = utils.queryParamsUtils.mergeQueryParams;
const argsToQueries = utils.queryParamsUtils.argsToQueries;
const gl = utils.logs;
const makeRequest = require("./utils/api-request").makeRequest;


const issues = function (action, queries) {
    issues.gitlabUrlApi = process.env["GL_URL"] || "https://gitlab.com";
    issues.apiVersion = `/api/${process.env["GL_API_VERSION"] || "v4"}`;

    if (action) {
        switch (action) {
            case "list":
                issues.list(argsToQueries(queries));
                break;
            case "my-estimations":
                issues.myEstimations(argsToQueries(queries));
                break;
            default:
                gl.error("Not valid action, the actions are [list, my-estimations]");
        }
    }
};

issues.gitlabUrlApi = "";
issues.apiVersion = "";
issues.apiEndpoint = "/issues";

/**
 * List of issues
 *
 * @param queryParams {{string[]: string[]}}
 * @param callback? {function (responseBody: Object)}
 */
issues.list = function list(queryParams, callback) {
    const url = `${issues.gitlabUrlApi}${issues.apiVersion}${issues.apiEndpoint}?${mergeQueryParams(queryParams)}`;
    const options = {url, headers: {"PRIVATE-TOKEN": process.env["GL_TOKEN"] || ""}};

    gl.info(url);
    makeRequest(options, callback || issues.showList);
};

issues.myEstimations = function myEstimations(queryParams, callback) {
    queryParams = merge(queryParams, {"scope": "assigned_to_me"});
    const url = `${issues.gitlabUrlApi}${issues.apiVersion}${issues.apiEndpoint}?${mergeQueryParams(queryParams)}`;
    const options = {url, headers: {"PRIVATE-TOKEN": process.env["GL_TOKEN"] || ""}};

    gl.info(url);
    makeRequest(options, callback || issues.calculate);
};

issues.showList = function showList(infoData) {
    console.log("List of issues");
    console.log(infoData);
};

issues.calculate = function calculate(infoData) {
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


module.exports = exports = issues;
