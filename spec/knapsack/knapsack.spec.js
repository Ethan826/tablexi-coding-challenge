"use strict";
var knapsack_1 = require("../../src/knapsack/knapsack");
var immutable_1 = require("immutable");
describe("knapsack", function () {
    var expectedResultGiven = immutable_1.OrderedSet([
        immutable_1.List([215, 215, 215, 215, 215, 215, 215]),
        immutable_1.List([215, 355, 355, 580])
    ]);
    it("correctly computes the supplied problem", function () {
        var expectedResultGiven = immutable_1.OrderedSet([
            immutable_1.List([215, 215, 215, 215, 215, 215, 215]),
            immutable_1.List([215, 355, 355, 580])
        ]);
        var menuItems = immutable_1.OrderedSet([215, 275, 335, 355, 420, 580]);
        expect((new knapsack_1.Knapsack(menuItems, 1505)).getResults()).toEqual(expectedResultGiven);
    });
    it("correctly computes the supplied problem without extraneous numbers", function () {
        expect((new knapsack_1.Knapsack(immutable_1.OrderedSet([215, 355, 580]), 1505)).getResults()).toEqual(expectedResultGiven);
    });
    it("finds no results when supplied problem is altered", function () {
        expect((new knapsack_1.Knapsack(immutable_1.OrderedSet([225, 355, 580]), 1505)).getResults()).not.toEqual(expectedResultGiven);
    });
    it("correctly computes additional data", function () {
        (function () {
            var expectedResult = immutable_1.OrderedSet([immutable_1.List([2, 2, 2]), immutable_1.List([3, 3]), immutable_1.List([2, 4])]);
            expect((new knapsack_1.Knapsack(immutable_1.OrderedSet([2, 3, 4]), 6)).getResults()).toEqual(expectedResult);
        })();
        (function () {
            var expectedResult = immutable_1.OrderedSet([immutable_1.List([2, 2, 2]), immutable_1.List([3, 3])]);
            expect((new knapsack_1.Knapsack(immutable_1.OrderedSet([2, 3, 5]), 6)).getResults()).toEqual(expectedResult);
        })();
        (function () {
            var expectedResult = immutable_1.OrderedSet([
                immutable_1.List([1, 1, 1, 1]),
                immutable_1.List([1, 1, 2]),
                immutable_1.List([2, 2]),
                immutable_1.List([1, 3])]);
            expect((new knapsack_1.Knapsack(immutable_1.OrderedSet([1, 2, 3]), 4)).getResults()).toEqual(expectedResult);
        })();
    });
});
