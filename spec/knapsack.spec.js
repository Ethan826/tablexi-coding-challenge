"use strict";
var knapsack_1 = require("../src/knapsack");
var immutable_1 = require("immutable");
describe("knapsack", function () {
    it("correctly computes the supplied problem", function () {
        var expectedResult = [
            [
                { food: "mixed fruit", price: 215 },
                { food: "mixed fruit", price: 215 },
                { food: "mixed fruit", price: 215 },
                { food: "mixed fruit", price: 215 },
                { food: "mixed fruit", price: 215 },
                { food: "mixed fruit", price: 215 },
                { food: "mixed fruit", price: 215 }
            ], [
                { food: "mixed fruit", price: 215 },
                { food: "hot wings", price: 355 },
                { food: "hot wings", price: 355 },
                { food: "sampler plate", price: 580 }
            ]
        ];
        var menuItems = immutable_1.List([
            { food: "mixed fruit", price: 215 },
            { food: "french fries", price: 275 },
            { food: "side salad", price: 335 },
            { food: "hot wings", price: 355 },
            { food: "mozzarella sticks", price: 420 },
            { food: "sampler plate", price: 580 }
        ]).sort();
        var result = (new knapsack_1.Knapsack(menuItems, 1505)).getPossibleOrders();
        expect(result).toEqual(expectedResult);
    });
});
