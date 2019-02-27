const expect = require("chai").expect;

const publishEnv = require("./publish-env");

describe("publish-env", function () {
    it("should publish the env variables", function () {
        publishEnv("TEST_ENV", "test value");
        expect(process.env["TEST_ENV"]).to.equal("test value");
    });
});
