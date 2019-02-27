const request = require("request");
const merge = require("lodash/merge");

const mergeQueryParams = require("./utils/query-params-utils").mergeQueryParams;
const argsToQueries = require("./utils/query-params-utils").argsToQueries;
const gl = require("./utils/logs");

let gitlabUrlApi;
let apiVersion;
const apiEndpoint = "/issues";


module.exports = exports = function (action, queries) {
    this.list = list;
    this.myEstimations = myEstimations;

    gitlabUrlApi = process.env['GL_URL'] || "https://gitlab.com";
    apiVersion = `/api/${process.env['GL_API_VERSION'] || "v4"}`;

    switch (action) {
        case 'list':
            list(argsToQueries(queries));
            break;
        case 'my-estimations':
            myEstimations(argsToQueries(queries));
            break;
        default:
            gl.error('Not valid action, the actions are [list]');
    }
};

/**
 *
 * @param queryParams {{string[]: string[]}}
 */
function list(queryParams) {
    const url = `${gitlabUrlApi}${apiVersion}${apiEndpoint}?${mergeQueryParams(queryParams)}`;
    const options = {
        url,
        headers: {
            'PRIVATE-TOKEN': process.env['GL_TOKEN'] || ''
        }
    };

    gl.info(url);

    makeRequest(options, showList);
}

function myEstimations(queryParams) {
    queryParams = merge(queryParams, {
        "scope": "assigned_to_me"
    });
    const url = `${gitlabUrlApi}${apiVersion}${apiEndpoint}?${mergeQueryParams(queryParams)}`;
    const options = {
        url,
        headers: {
            'PRIVATE-TOKEN': process.env['GL_TOKEN'] || ''
        }
    };
    gl.info(url);
    makeRequest(options, calculate);
}

function makeRequest(options, callback) {
    request(options, function (error, response, body) {
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
}

function showList(infoData) {
    console.log('List of issues');
    console.log(infoData);
}

function calculate(infoData) {
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
}
