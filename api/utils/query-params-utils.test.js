const expect = require('chai').expect;

const argsToQueries = require('./query-params-utils').argsToQueries;
const mergeQueryParams = require('./query-params-utils').mergeQueryParams;

describe('logs', function () {
    describe('argsToQueries method', function () {
        it('should transform the example in an object', function () {
            expect(argsToQueries(['name=wil92', 'nickname=wil']))
                .to.deep.equal({name: 'wil92', nickname: 'wil'});
        });
        it('should return and empty object', function () {
            expect(argsToQueries([]))
                .to.deep.equal({});
        });
    });

    describe('mergeQueryParams method', function () {

    });
});
