const chai = require("chai");
const spies = require("chai-spies");
const mock = require("mock-require");

chai.use(spies);
const expect = chai.expect;

const noop = function () {
};

let readConfig = chai.spy(function () {
    return {token: "test"};
});
let writeConfig = chai.spy(noop);
let keyValue = chai.spy(noop);
mock("./utils/config-utils", {readConfig, writeConfig});
mock("./utils/utils", {keyValue});
mock.reRequire("./utils");
mock.reRequire("./config");

const config = require("./config");

describe("config", function () {
    after(function () {
        mock.stopAll();
        mock.reRequire("./utils");
    });

    afterEach(function () {
        chai.spy.restore(console);
    });

    it("should set a new configuration", function () {
        config("set", "token=test");
        expect(readConfig).to.have.been.called();
        expect(writeConfig).to.have.been.called.with({token: "test"});
    });

    it("should get a configuration value", function () {
        chai.spy.on(console, "log");
        config("get", "token");
        expect(console.log).to.have.been.called.with("token=test");
    });
});
