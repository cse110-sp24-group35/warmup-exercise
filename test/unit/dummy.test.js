const { sum, subtract } = require('../../dummy.js');
const { assert, expect } = require('chai');

describe("sum(a, b)", () => {
    it("sum(a, b) returns right type", () => {
        let a = 1;
        let b = 1;

        assert.isNumber(sum(a, b));
    });

    it("sum(a, b) calculated properly", () => {
        let a = 2;
        let b = 2;

        expect(sum(a, b)).to.equal(4);
    });

    it("subtract(a, b) calculated properly", () => {
        let a = 2;
        let b = 2;

        expect(subtract(a, b)).to.equal(0);
    });

    it("subtract(a, b) returns right type", () => {
        let a = 1;
        let b = 1;

        assert.isNumber(subtract(a, b));
    });
});
