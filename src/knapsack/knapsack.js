"use strict";
var immutable_1 = require("immutable");
var hash = require("object-hash");
var Knapsack = (function () {
    function Knapsack(prices, budget) {
        this.memo = {};
        this.results = this.computeHelper(prices.toOrderedSet(), budget);
    }
    Knapsack.prototype.getResults = function () { return this.results; };
    Knapsack.prototype.hashArgs = function (prices, budget) {
        return hash(hash(prices.toJS()) + hash(budget));
    };
    Knapsack.prototype.computeHelper = function (prices, budget) {
        var _this = this;
        var hashed = this.hashArgs(prices, budget);
        var memoizedResult = this.memo[hashed];
        if (typeof memoizedResult !== "undefined") {
            return memoizedResult;
        }
        if (prices.size === 0) {
            var results = immutable_1.Set([]);
            this.memo[hashed] = results;
            return results;
        }
        else if (prices.size === 1) {
            var onlyElement = prices.toList().get(0);
            if (budget % onlyElement === 0) {
                var results = immutable_1.Set([immutable_1.List(Array(budget / onlyElement).fill(onlyElement))]);
                this.memo[hashed] = results;
                return results;
            }
            else {
                var results = immutable_1.Set([]);
                this.memo[hashed] = results;
                return results;
            }
        }
        else {
            return prices.flatMap(function (price) {
                var newBudget = budget - price;
                var newMenuItems = prices.filter(function (c) {
                    var priceCeiling = Math.min(newBudget, price);
                    return c <= priceCeiling;
                });
                if (newBudget === 0) {
                    var results_1 = immutable_1.List([immutable_1.List([price])]);
                    _this.memo[hashed] = results_1;
                    return results_1;
                }
                ;
                var recursive = _this.computeHelper(newMenuItems, newBudget);
                var results = recursive
                    ? recursive.map(function (e) { return e.concat(price); }).toSet()
                    : immutable_1.OrderedSet([]);
                _this.memo[hashed] = results;
                return results;
            });
        }
    };
    ;
    return Knapsack;
}());
exports.Knapsack = Knapsack;
