const request = require("request");
const _ = require("lodash");

const gitlabUrlApi = process.env['GL_URL'] || "https://gitlab.com";
const apiVersion = process.env['GL_API_VERSION'] || "/api/v4";
const apiEndpoint = process.env['GL_ENDPOINT'] || "/issues";
const queryParams = {
    "scope": "assigned_to_me",
    "milestone": "2019-02",
    "per_page": "100",
    "page": "1"
};

function addQueryParams(queryParams) {
    return _.reduce(
        queryParams,
        (queries, value, key) => queries === "" ? `${key}=${value}` : `${queries}&${key}=${value}`,
        ""
    );
}

const url = `${gitlabUrlApi}${apiVersion}${apiEndpoint}?${addQueryParams(queryParams)}`;
console.log('url', url);

const options = {
    url,
    headers: {
        'PRIVATE-TOKEN': process.env['GL_TOKEN'] || ''
    }
};

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

function callback(error, response, body) {
    if (error) {
        return console.log('callback', error);
    }
    if (response.statusCode === 200) {
        var info = JSON.parse(body);
        calculate(info);
    }
}

request(options, callback);
