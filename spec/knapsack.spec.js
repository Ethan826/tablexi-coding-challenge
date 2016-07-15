"use strict";
var knapsack_1 = require("../src/knapsack");
var immutable_1 = require("immutable");
describe("knapsack", function () {
    it("correctly computes the supplied problem", function () {
        var expectedResult = immutable_1.List([immutable_1.List([215, 215, 215, 215, 215, 215, 215]), immutable_1.List([215, 355, 355, 580])]).toJS();
        expect(knapsack_1.Knapsack.knapsack(immutable_1.List([215, 275, 335, 355, 420, 580]), 1505).toJS()).toEqual(expectedResult);
    });
});
