"use strict";
var immutable_1 = require("immutable");
var Knapsack = (function () {
    function Knapsack(menuItems, budget) {
        this.menuItems = menuItems;
        this.budget = budget;
        this.possibleOrders = this.compute(menuItems, budget);
    }
    Knapsack.prototype.getPossibleOrders = function () {
        return this.possibleOrders;
    };
    Knapsack.prototype.compute = function (menuItems, budget) {
        var _this = this;
        if (menuItems.size === 0) {
            return null;
        }
        else if (menuItems.size === 1) {
            var onlyElement = menuItems.get(0);
            if (budget % onlyElement === 0) {
                return immutable_1.List([immutable_1.List(Array(budget / onlyElement).fill(onlyElement))]);
            }
            else {
                return null;
            }
        }
        else {
            return menuItems.flatMap(function (menuItem) {
                var newBudget = budget - menuItem;
                var newMenuItems = _this.menuItems.filter(function (c) {
                    var menuItemCeiling = Math.min(newBudget, menuItem);
                    return c <= menuItemCeiling;
                });
                if (newBudget === 0)
                    return immutable_1.List([immutable_1.List([menuItem])]);
                var results = _this.compute(newMenuItems, newBudget);
                return results
                    ? results.map(function (e) { return e.concat(menuItem); })
                    : null;
            });
        }
    };
    ;
    return Knapsack;
}());
exports.Knapsack = Knapsack;
console.log((new Knapsack(immutable_1.List([2, 3, 4]), 6)).getPossibleOrders());
