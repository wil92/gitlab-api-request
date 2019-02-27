const expect = require("chai").expect;

const gl = require("./logs");

describe("logs", function () {
    it("expect the defined logs", function () {
        expect(gl.logs).to.deep.equal(["error", "info", "log"]);
    });

    describe("weight method", function () {
        it("should return 0 the error log", function () {
            expect(gl.weight("error")).to.equal(0);
        });
        it("should return 1 the info log", function () {
            expect(gl.weight("info")).to.equal(1);
        });
        it("should return 2 the log", function () {
            expect(gl.weight("log")).to.equal(2);
        });
    });

    describe("reduce method", function () {
        it("should return an empty string", function () {
            const args = [];
            expect(gl.reduce(args)).to.equal("");
        });
        it("should return only one arg", function () {
            const args = ["test"];
            expect(gl.reduce(args)).to.equal(args[0]);
        });
        it("should return the args joint by an space", function () {
            const args = ["test", "for", "reduce"];
            expect(gl.reduce(args)).to.equal("test for reduce");
        });
    });
});
