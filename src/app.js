"use strict";
var parser_1 = require("./parser");
var mapMaker_1 = require("./mapMaker");
var knapsack_1 = require("./knapsack");
var formatter_1 = require("./formatter");
var App = (function () {
    function App(data) {
        var parserResults = (new parser_1.Parser(data)).getParserResults();
        this.desiredPrice = parserResults.desiredPrice;
        this.priceMap = mapMaker_1.MapMaker.makeMap(parserResults.foodEntries);
        this.priceCombinations = knapsack_1.Knapsack.compute(this.priceMap.keySeq().toSet().toList(), this.desiredPrice).toSet();
        var formatter = new formatter_1.Formatter(this.priceMap, this.priceCombinations);
        this.results = formatter.makeSentences();
    }
    App.prototype.getResults = function () {
        return this.results;
    };
    App.prototype.getDesiredPrice = function () {
        return this.desiredPrice;
    };
    return App;
}());
exports.App = App;
