"use strict";
var immutable_1 = require("immutable");
var knapsack = function (candidates, target) {
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
            var results = knapsack(candidates.filter(function (e) { return e <= Math.min(newTarget, candidate); }), newTarget);
            return results ? results.map(function (e) { return e.concat(candidate); }) : null;
        });
    }
};
console.log(knapsack(immutable_1.List([215, 275, 335, 355, 420, 580]), 1505));
