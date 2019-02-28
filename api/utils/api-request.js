const request = require("request");
const gl = require("./logs");

function makeRequest(options, callback) {
    request(options, function (error, response, body) {
        if (error) {
            return gl.error("issue", error);
        }
        var info = JSON.parse(body);
        switch (response.statusCode) {
            case 200:
                gl.log(info);
                callback(info);
                break;
            case 401:
                gl.error("issue", info.message);
                break;
        }
    });
}

module.exports = exports = {makeRequest};
