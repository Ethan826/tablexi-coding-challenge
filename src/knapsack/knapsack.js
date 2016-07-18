"use strict";
var immutable_1 = require("immutable");
var fnv = require("fnv-plus");
var Knapsack = (function () {
    function Knapsack(prices, budget) {
        this.memo = {};
        this.results = this.computeHelper(prices, budget);
    }
    Knapsack.prototype.getResults = function () {
        return this.results;
    };
    Knapsack.prototype.computeHelper = function (prices, budget) {
        var _this = this;
        var hashedArgs = fnv.hash(String(prices) + String(budget)).str();
        var lookup = this.memo[hashedArgs];
        if (lookup) {
            console.log("Memoization!");
            return lookup;
        }
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
                var recursion = _this.computeHelper(newMenuItems, newBudget);
                var results = recursion
                    ? recursion.map(function (e) { return e.concat(price); }).toSet()
                    : null;
                _this.memo[hashedArgs] = results;
                return results;
            });
        }
    };
    return Knapsack;
}());
exports.Knapsack = Knapsack;
