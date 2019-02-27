const reduce = require("lodash/reduce");

exports.mergeQueryParams = function (queryParams) {
    return reduce(
        queryParams,
        (queries, value, key) => queries === "" ? `${key}=${value}` : `${queries}&${key}=${value}`,
        ""
    );
};
