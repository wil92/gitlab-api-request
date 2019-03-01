const expect = require("chai").expect;
const mock = require("mock-require");

const makeRequest = require("./api-request").makeRequest;

let requestStatus, requestBody, requestError;
mock("request", function (option, callback) {
    callback(requestError, requestStatus, requestBody);
});
mock.reRequire("./api-request");

process.env["GR_VERBOSE"] = "NO_VERBOSE";

describe("api-request", function () {
    afterEach(function () {
        requestStatus = 200;
        requestBody = "";
        requestError = null;
    });

    after(function () {
        mock.stopAll();
    });

    it("should make a request and trigger the callback function with 200", function () {
        requestStatus = {statusCode: 200};
        requestBody = "{}";
        makeRequest({url: "http://test.com"}, function (info) {
            expect(info).to.deep.equal({});
        });
    });

    it("should make a request and trigger the callback function with 401", function () {
        requestStatus = {statusCode: 401};
        requestBody = "{\"message\": \"error\"}";
        makeRequest({url: "http://test.com"}, function (info) {
            expect(info).to.deep.equal({});
        });
    });

    it("should make a request and trigger an error", function () {
        requestError = new Error("test");
        makeRequest({url: "http://test.com"}, function (info) {
        });
    });
});
