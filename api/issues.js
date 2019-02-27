const request = require("request");
const reduce = require("lodash/reduce");

const gitlabUrlApi = process.env['GL_URL'] || "https://gitlab.com";
const apiVersion = `/api/${process.env['GL_API_VERSION'] || "v4"}`;
const verbose = process.env['GL_VERBOSE'] || 'error';
const apiEndpoint = "/issues";

/**
 *
 * @param queryParams {{string[]: string[]}}
 */
exports.list = function (queryParams) {
    queryParams = queryParams || {
        "scope": "assigned_to_me",
        "milestone": "2019-02",
        "per_page": "100",
        "page": "1"
    };
    const url = `${gitlabUrlApi}${apiVersion}${apiEndpoint}?${mergeQueryParams(queryParams)}`;
    const options = {
        url,
        headers: {
            'PRIVATE-TOKEN': process.env['GL_TOKEN'] || ''
        }
    };

    gl.info(url);

    request(options, function (error, response, body) {
        if (error) {
            return gl.error('issue', error);
        }
        if (response.statusCode === 200) {
            var info = JSON.parse(body);
            gl.log(info);
            calculate(info);
        }
    });
};

const gl = {
    logs: ['error', 'info', 'log'],
    log: function (msg) {this.weight('log') <= this.weight(verbose) && console.log(msg)},
    info: function (msg) {this.weight('info') <= this.weight(verbose) && console.info(msg)},
    error: function (msg) {this.weight('error') <= this.weight(verbose) && console.error(msg)},
    weight: function (log) {return this.logs.indexOf(log) === -1 ? this.logs.length : this.logs.indexOf(log)}
};

function mergeQueryParams(queryParams) {
    return reduce(
        queryParams,
        (queries, value, key) => queries === "" ? `${key}=${value}` : `${queries}&${key}=${value}`,
        ""
    );
}

function calculate(infoData) {
    let time = 0;
    let issues = 0;
    let spentTime = 0;

    infoData.forEach((data) => {
        time += data['time_stats'] && data['time_stats']['time_estimate'] || 0;
        spentTime += data['time_stats'] && data['time_stats']['total_time_spent'] || 0;
        issues++;
    });

    console.log('Estimate', time);
    console.log('Spent', spentTime);
    console.log('Hours', (time + spentTime) / 3600);
    console.log('Issues', issues);
}
