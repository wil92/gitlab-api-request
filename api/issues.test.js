const chai = require('chai');
const spies = require('chai-spies');
const mock = require('mock-require');

chai.use(spies);

const expect = chai.expect;

let requestStatus, requestBody, requestError;
const noop = function () {
};
mock('request', function (option, callback) {
    callback(requestError, requestStatus, requestBody);
});
process.env['GL_VERBOSE'] = 'NO_VERBOSE';

describe('issues', function () {
    describe('module', function () {
        let issues;

        beforeEach(function () {
            issues = require('./issues');
        });

        afterEach(function () {
            chai.spy.restore(issues);
        });

        it('should call the list function', function () {
            chai.spy.on(issues, 'list', noop);
            issues('list', '');
            expect(issues.list).to.have.been.called();
        });

        it('should call the myEstimations function', function () {
            chai.spy.on(issues, 'myEstimations', noop);
            issues('my-estimations', '');
            expect(issues.myEstimations).to.have.been.called();
        });
    });

    describe('list method', function () {
        let issues;
        beforeEach(function () {
            issues = require('./issues');
            issues.gitlabUrlApi = 'https://gitlab.com';
            issues.apiVersion = 'v4';
        });

        afterEach(function () {
            chai.spy.restore(issues);
        });

        it('should list the user\'s issues', function () {
            chai.spy.on(issues, 'makeRequest', noop);
            issues.list({});
            expect(issues.makeRequest).to.have.been.called.with({
                url: 'https://gitlab.comv4/issues?',
                headers: {'PRIVATE-TOKEN': ''}
            }, issues.showList);
        });
    });

    describe('myEstimations method', function () {
        let issues;
        beforeEach(function () {
            issues = require('./issues');
            issues.gitlabUrlApi = 'https://gitlab.com';
            issues.apiVersion = 'v4';
        });

        afterEach(function () {
            chai.spy.restore(issues);
        });

        it('should calculate the user\'s estimated time', function () {
            chai.spy.on(issues, 'makeRequest', noop);
            issues.myEstimations({});
            expect(issues.makeRequest).to.have.been.called.with({
                url: 'https://gitlab.comv4/issues?scope=assigned_to_me',
                headers: {'PRIVATE-TOKEN': ''}
            }, issues.calculate);
        });
    });

    describe('utils functions', function () {
        let issues;
        beforeEach(function () {
            issues = require('./issues');
        });

        afterEach(function () {
            chai.spy.restore(console);
            requestStatus = 200;
            requestBody = '';
            requestError = null;
        });

        it('should showList the list of issues', function () {
            chai.spy.on(console, 'log', noop);
            issues.showList([]);
            // noinspection BadExpressionStatementJS
            expect(console.log).to.have.been.called.twice;
        });

        it('should calculate the user\'s estimated tasks', function () {
            chai.spy.on(console, 'log', noop);
            issues.calculate([{}]);
            expect(console.log).to.have.been.called.exactly(3);
        });

        it('should make a request and trigger the callback function with 200', function () {
            requestStatus = {statusCode: 200};
            requestBody = '{}';
            issues.makeRequest({url: 'http://test.com'}, function (info) {
                expect(info).to.deep.equal({});
            });
        });

        it('should make a request and trigger the callback function with 401', function () {
            requestStatus = {statusCode: 401};
            requestBody = '{"message": "error"}';
            issues.makeRequest({url: 'http://test.com'}, function (info) {
                expect(info).to.deep.equal({});
            });
        });

        it('should make a request and trigger an error', function () {
            requestError = new Error('test');
            issues.makeRequest({url: 'http://test.com'}, function (info) {});
        });
    });
});
