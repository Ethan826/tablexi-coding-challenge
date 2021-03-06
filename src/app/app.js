"use strict";
var parser_1 = require("../parser/parser");
var knapsack_1 = require("../knapsack/knapsack");
var formatter_1 = require("../formatter/formatter");
var App = (function () {
    function App(data) {
        var parserResults = (new parser_1.Parser(data)).getParserResults();
        this.desiredPrice = parserResults.desiredPrice;
        this.priceMap = parserResults.foodEntries;
        var knapsack = new knapsack_1.Knapsack(this.priceMap.keySeq().toOrderedSet(), this.desiredPrice);
        this.priceCombinations = knapsack.getResults();
        var formatter = new formatter_1.Formatter(this.priceMap, this.priceCombinations);
        this.results = formatter.getSentences();
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
var f = require("fs").readFileSync("/home/ethan/Desktop/tablexi-coding-challenge/spec/helpers/yesresults.txt", "utf-8");
var a = new App(f);
