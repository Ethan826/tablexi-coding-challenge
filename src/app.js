"use strict";
var parser_1 = require("./parser");
var mapMaker_1 = require("./mapMaker");
var knapsack_1 = require("./knapsack");
var TEST_DATA = "$15.05\nmixed fruit,$2.15\nfrench fries,$2.75\nside salad,$3.35\nhot wings,$3.55\nmozzarella sticks,$4.20\nsampler plate,$5.80";
var App = (function () {
    function App() {
        var parserResults = (new parser_1.Parser(TEST_DATA)).getParserResults();
        this.desiredPrice = parserResults.desiredPrice;
        this.priceMap = mapMaker_1.MapMaker.makeMap(parserResults);
        this.priceCombinations = knapsack_1.Knapsack.compute(this.priceMap.keySeq().toSet().toList(), this.desiredPrice).toSet();
    }
    return App;
}());
exports.App = App;
var a = new App();
