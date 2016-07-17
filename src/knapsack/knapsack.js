"use strict";
var immutable_1 = require("immutable");
var Knapsack = (function () {
    function Knapsack() {
    }
    Knapsack.compute = function (prices, budget) {
        var results = this.computeHelper(prices, budget);
        return results ? results : immutable_1.Set();
    };
    Knapsack.computeHelper = function (prices, budget) {
        var _this = this;
        if (prices.size === 0) {
            return null;
        }
        else if (prices.size === 1) {
            var onlyElement = prices.toList().get(0);
            if (budget % onlyElement === 0) {
                return immutable_1.Set([immutable_1.List(Array(budget / onlyElement).fill(onlyElement))]);
            }
            else {
                return null;
            }
        }
        else {
            return prices.flatMap(function (price) {
                var newBudget = budget - price;
                var newMenuItems = prices.filter(function (c) {
                    var priceCeiling = Math.min(newBudget, price);
                    return c <= priceCeiling;
                });
                if (newBudget === 0)
                    return immutable_1.List([immutable_1.List([price])]);
                var results = _this.computeHelper(newMenuItems, newBudget);
                return results
                    ? results.map(function (e) { return e.concat(price); }).toList()
                    : null;
            });
        }
    };
    ;
    return Knapsack;
}());
exports.Knapsack = Knapsack;
