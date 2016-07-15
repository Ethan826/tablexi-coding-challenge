"use strict";
var immutable_1 = require("immutable");
var Knapsack = (function () {
    function Knapsack(menuItems, budget) {
        this.menuItems = menuItems;
        this.budget = budget;
        this.possibleOrders = this.compute(menuItems, budget);
    }
    Knapsack.prototype.getPossibleOrders = function () {
        return this.possibleOrders.toJS();
    };
    Knapsack.prototype.compute = function (menuItems, budget) {
        var _this = this;
        if (menuItems.size === 0) {
            return null;
        }
        else if (menuItems.size === 1) {
            var onlyElement = menuItems.get(0);
            if (budget % onlyElement.price === 0) {
                return immutable_1.List([immutable_1.List(Array(budget / onlyElement.price).fill(onlyElement))]);
            }
            else {
                return null;
            }
        }
        else {
            return menuItems.flatMap(function (menuItem) {
                var newBudget = budget - menuItem.price;
                var newMenuItems = _this.menuItems.filter(function (c) {
                    var menuItemCeiling = Math.min(newBudget, menuItem.price);
                    return c.price <= menuItemCeiling;
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
var k = new Knapsack(immutable_1.List([
    { food: "mixed fruit", price: 215 },
    { food: "french fries", price: 275 },
    { food: "side salad", price: 335 },
    { food: "hot wings", price: 355 },
    { food: "mozzarella sticks", price: 420 },
    { food: "sampler plate", price: 580 }
]), 1505);
var foo = k.getPossibleOrders();
console.log(foo);
