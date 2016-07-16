"use strict";
var parser_1 = require("./parser");
var mapMaker_1 = require("./mapMaker");
var knapsack_1 = require("./knapsack");
var browser_1 = require("./browser");
var App = (function () {
    function App(data) {
        this.browser = new browser_1.Browser();
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
