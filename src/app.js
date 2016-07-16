"use strict";
var parser_1 = require("./parser");
var mapMaker_1 = require("./mapMaker");
var knapsack_1 = require("./knapsack");
var App = (function () {
    function App(data) {
        var parserResults = (new parser_1.Parser(data)).getParserResults();
        this.desiredPrice = parserResults.desiredPrice;
        this.priceMap = mapMaker_1.MapMaker.makeMap(parserResults.foodEntries);
        this.priceCombinations = knapsack_1.Knapsack.compute(this.priceMap.keySeq().toSet().toList(), this.desiredPrice).toSet();
    }
    App.prototype.getDesiredPrice = function () {
        return this.desiredPrice;
    };
    return App;
}());
exports.App = App;
var a = new App("$15.05\nmixed fruit,$2.15\nfrench fries,$2.75\nside salad,$3.35\nhot wings,$3.55\nmozzarella sticks,$4.20\nsampler plate,$5.80");
console.log(a.priceMap);
