"use strict";
var knapsack_1 = require("../src/knapsack");
var immutable_1 = require("immutable");
describe("knapsack", function () {
    var expectedResultGiven = immutable_1.Set([
        immutable_1.List([215, 215, 215, 215, 215, 215, 215]),
        immutable_1.List([215, 355, 355, 580])
    ]);
    it("correctly computes the supplied problem", function () {
        var expectedResultGiven = immutable_1.Set([
            immutable_1.List([215, 215, 215, 215, 215, 215, 215]),
            immutable_1.List([215, 355, 355, 580])
        ]);
        var menuItems = immutable_1.Set([215, 275, 335, 355, 420, 580]);
        expect(knapsack_1.Knapsack.compute(menuItems, 1505)).toEqual(expectedResultGiven);
    });
    it("correctly computes the supplied problem without extraneous numbers", function () {
        expect(knapsack_1.Knapsack.compute(immutable_1.Set([215, 355, 580]), 1505)).toEqual(expectedResultGiven);
    });
    it("finds no results when supplied problem is altered", function () {
        expect(knapsack_1.Knapsack.compute(immutable_1.Set([225, 355, 580]), 1505)).not.toEqual(expectedResultGiven);
    });
    it("corretly computes additional data", function () {
        (function () {
            var expectedResult = immutable_1.Set([immutable_1.List([2, 2, 2]), immutable_1.List([3, 3]), immutable_1.List([2, 4])]);
            expect(knapsack_1.Knapsack.compute(immutable_1.Set([2, 3, 4]), 6)).toEqual(expectedResult);
        })();
        (function () {
            var expectedResult = immutable_1.Set([immutable_1.List([2, 2, 2]), immutable_1.List([3, 3])]);
            expect(knapsack_1.Knapsack.compute(immutable_1.Set([2, 3, 5]), 6)).toEqual(expectedResult);
        })();
        (function () {
            var expectedResult = immutable_1.Set([
                immutable_1.List([1, 1, 1, 1]).sort(),
                immutable_1.List([2, 1, 1]).sort(),
                immutable_1.List([2, 2]).sort(),
                immutable_1.List([3, 1]).sort()]);
            expect(knapsack_1.Knapsack.compute(immutable_1.Set([1, 2, 3]), 4)).toEqual(expectedResult);
        })();
    });
});