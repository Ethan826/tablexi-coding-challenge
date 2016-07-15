"use strict";
var immutable_1 = require("immutable");
var Knapsack = (function () {
    function Knapsack(menuItems, budget) {
        this.budget = budget;
        this.menuItems = getPriceMap(menuItems);
        this.prices = (this.menuItems.map(function (i) { return i.price; })).toSet();
        console.log(this.prices);
        this.possiblePriceCombos = this.compute(this.prices, budget);
    }
    Knapsack.prototype.getPossibleOrders = function () {
        return this.possiblePriceCombos.toJS();
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
                var newMenuItems = _this.prices.filter(function (c) {
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
    Knapsack.prototype.getPermutations = function () {
        var allPrices = this.menuItems.map(function (i) { return i.price; });
        var repeats = this.getRepeats(allPrices);
    };
    Knapsack.prototype.getPriceMap = function (menuItems) {
        return menuItems
            .reduce(function (accum, el) {
            return accum.has(el.price)
                ? accum.update(el.price, function (v) { return v.concat(el.food); })
                : accum.set(el.price, immutable_1.List([el.food]));
        }, immutable_1.Map({}));
    };
    return Knapsack;
}());
exports.Knapsack = Knapsack;
var k = new Knapsack([{ food: "mixed fruit", price: 215 },
    { food: "dipsy", price: 215 },
    { food: "french fries", price: 275 },
    { food: "side salad", price: 335 },
    { food: "hot wings", price: 355 },
    { food: "mozzarella sticks", price: 420 },
    { food: "sampler plate", price: 580 },
    { food: "fart", price: 580 }
], 1505);
var foo = k.getPossibleOrders();
console.log(foo);
