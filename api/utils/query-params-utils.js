const reduce = require("lodash/reduce");
const merge = require("lodash/merge");
const keyValue = require("./utils").keyValue;

exports.argsToQueries = function (queries) {
    if (queries) {
        return queries.reduce(function (obj, q) {
            return merge(obj, keyValue(q));
        }, {});
    }
    return [];
};

exports.mergeQueryParams = function (queryParams) {
    return reduce(
        queryParams,
        (queries, value, key) => queries === "" ? `${key}=${value}` : `${queries}&${key}=${value}`,
        ""
    );
};
