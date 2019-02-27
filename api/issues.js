const merge = require("lodash/merge");

const mergeQueryParams = require("./utils/query-params-utils").mergeQueryParams;
const argsToQueries = require("./utils/query-params-utils").argsToQueries;
const gl = require("./utils/logs");


const issues = function (action, queries) {

    issues.gitlabUrlApi = process.env['GL_URL'] || "https://gitlab.com";
    issues.apiVersion = `/api/${process.env['GL_API_VERSION'] || "v4"}`;

    switch (action) {
        case 'list':
            issues.list(argsToQueries(queries));
            break;
        case 'my-estimations':
            issues.myEstimations(argsToQueries(queries));
            break;
        default:
            gl.error('Not valid action, the actions are [list, my-estimations]');
    }
};

issues.gitlabUrlApi = '';
issues.apiVersion = '';
issues.apiEndpoint = "/issues";

/**
 *
 * @param queryParams {{string[]: string[]}}
 */
issues.list = function list(queryParams) {
    const url = `${issues.gitlabUrlApi}${issues.apiVersion}${issues.apiEndpoint}?${mergeQueryParams(queryParams)}`;
    const options = {url, headers: {'PRIVATE-TOKEN': process.env['GL_TOKEN'] || ''}};

    gl.info(url);
    issues.makeRequest(options, issues.showList);
};

issues.myEstimations = function myEstimations(queryParams) {
    queryParams = merge(queryParams, {"scope": "assigned_to_me"});
    const url = `${issues.gitlabUrlApi}${issues.apiVersion}${issues.apiEndpoint}?${mergeQueryParams(queryParams)}`;
    const options = {url, headers: {'PRIVATE-TOKEN': process.env['GL_TOKEN'] || ''}};

    gl.info(url);
    issues.makeRequest(options, issues.calculate);
};

issues.makeRequest = function makeRequest(options, callback) {
    require("request")(options, function (error, response, body) {
        if (error) {
            return gl.error('issue', error);
        }
        var info = JSON.parse(body);
        switch (response.statusCode) {
            case 200:
                gl.log(info);
                callback(info);
                break;
            case 401:
                gl.error('issue', info.message);
                break;
        }
    });
};

issues.showList = function showList(infoData) {
    console.log('List of issues');
    console.log(infoData);
};

issues.calculate = function calculate(infoData) {
    let estimateTime = 0;
    let issues = 0;
    let spentTime = 0;

    infoData.forEach((data) => {
        estimateTime += data['time_stats'] && data['time_stats']['time_estimate'] || 0;
        spentTime += data['time_stats'] && data['time_stats']['total_time_spent'] || 0;
        issues++;
    });

    console.log('Estimate', estimateTime / 3600);
    console.log('Spent', spentTime / 3600);
    console.log('Issues', issues);
};


module.exports = exports = issues;
