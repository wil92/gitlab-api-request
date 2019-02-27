const request = require("request");

const mergeQueryParams = require("./utils/query-params-utils").mergeQueryParams;
const gl = require("./utils/logs");

const gitlabUrlApi = process.env['GL_URL'] || "https://gitlab.com";
const apiVersion = `/api/${process.env['GL_API_VERSION'] || "v4"}`;
const apiEndpoint = "/issues";


module.exports = exports = function (action) {
    this.list = list;

    switch (action) {
        case 'list':
            list();
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
        var info = JSON.parse(body);
        switch (response.statusCode) {
            case 200:
                gl.log(info);
                calculate(info);
                break;
            case 401:
                gl.error('issue', info.message);
                break;
        }
    });
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
