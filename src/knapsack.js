"use strict";
var immutable_1 = require("immutable");
var Knapsack = (function () {
    function Knapsack(candidates, target) {
        this.candidates = candidates;
        this.target = target;
        this.possibleOrders = this.compute(candidates, target);
    }
    Knapsack.prototype.getPossibleOrders = function () {
        return this.possibleOrders;
    };
    Knapsack.prototype.compute = function (candidates, target) {
        var _this = this;
        if (candidates.size === 0) {
            return null;
        }
        else if (candidates.size === 1) {
            var onlyElement = candidates.get(0);
            if (target % onlyElement === 0) {
                return immutable_1.List([immutable_1.List(Array(target / onlyElement).fill(onlyElement))]);
            }
            else {
                return null;
            }
        }
        else {
            return candidates.flatMap(function (candidate) {
                var newTarget = target - candidate;
                var results = _this.compute(_this.candidates.filter(function (e) { return e <= Math.min(newTarget, candidate); }), newTarget);
                return results ? results.map(function (e) { return e.concat(candidate); }) : null;
            });
        }
    };
    ;
    return Knapsack;
}());
exports.Knapsack = Knapsack;
