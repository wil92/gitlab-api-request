const chai = require("chai");
const spies = require("chai-spies");
const mock = require("mock-require");

chai.use(spies);
const expect = chai.expect;

const noop = function () {
};

let makeRequest = chai.spy(noop);
mock("./utils/api-request", {makeRequest: makeRequest});
mock("./utils/config-utils", {
    readConfig: function () {
        return {};
    }
});
mock.reRequire("./issues");

describe("issues", function () {
    after(function () {
        mock.stopAll();
        mock.reRequire("./issues");
    });

    describe("module", function () {
        let issues;

        beforeEach(function () {
            issues = require("./issues");
        });

        afterEach(function () {
            chai.spy.restore(issues);
        });

        it("should call the list function", function () {
            chai.spy.on(issues, "list", noop);
            issues("list", "");
            expect(issues.list).to.have.been.called();
        });

        it("should call the myEstimations function", function () {
            chai.spy.on(issues, "myEstimations", noop);
            issues("my-estimations", "");
            expect(issues.myEstimations).to.have.been.called();
        });
    });

    describe("list method", function () {
        let issues;
        beforeEach(function () {
            issues = require("./issues");
            issues.gitlabUrlApi = "https://gitlab.com";
            issues.apiVersion = "v4";
        });

        it("should list the user's issues", function () {
            issues.list({});
            expect(makeRequest).to.have.been.called.with({
                url: "https://gitlab.comv4/issues?",
                headers: {"PRIVATE-TOKEN": ""}
            }, issues.showList);
        });
    });

    describe("myEstimations method", function () {
        let issues;
        beforeEach(function () {
            issues = require("./issues");
            issues.gitlabUrlApi = "https://gitlab.com";
            issues.apiVersion = "v4";
        });

        it("should calculate the user's estimated time", function () {
            issues.myEstimations({});
            expect(makeRequest).to.have.been.called.with({
                url: "https://gitlab.comv4/issues?scope=assigned_to_me",
                headers: {"PRIVATE-TOKEN": ""}
            }, issues.calculate);
        });
    });

    describe("utils functions", function () {
        let issues;
        beforeEach(function () {
            issues = require("./issues");
        });

        afterEach(function () {
            chai.spy.restore(console);
        });

        it("should showList the list of issues", function () {
            chai.spy.on(console, "log", noop);
            issues.showList([]);
            // noinspection BadExpressionStatementJS
            expect(console.log).to.have.been.called.twice;
        });

        it("should calculate the user's estimated tasks", function () {
            chai.spy.on(console, "log", noop);
            issues.calculate([{}]);
            expect(console.log).to.have.been.called.exactly(3);
        });
    });
});
