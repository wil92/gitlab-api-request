const reduce = require("lodash/reduce");
const merge = require("lodash/merge");

exports.argsToQueries = function (queries) {
    if (queries) {
        return queries.reduce(function (obj, q) {
            return merge(obj, keyValue(q));
        }, {});
    }
};

exports.mergeQueryParams = function (queryParams) {
    return reduce(
        queryParams,
        (queries, value, key) => queries === "" ? `${key}=${value}` : `${queries}&${key}=${value}`,
        ""
    );
};

function keyValue(arg) {
    const obj = {};
    let key = arg.split('=')[0];
    let value = arg.split('=')[1];
    obj[key] = value;
    return obj;
}
