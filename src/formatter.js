"use strict";
var immutable_1 = require("immutable");
var Formatter = (function () {
    function Formatter(priceMap, priceCombinations) {
        var _this = this;
        this.priceMap = priceMap;
        this.priceCombinations = priceCombinations;
        this.priceCombinationsWithFreqs = this.priceCombinations
            .map(function (c) { return _this.frequencies(c); });
        this.priceMapWithCombinedFoods = this.combineSamePricedFoods();
    }
    Formatter.prototype.combineSamePricedFoods = function () {
        var alternatives = this.priceMap
            .entrySeq()
            .reduce(function (accum, tuple) {
            return accum.set(tuple[0], tuple[1].join(" or "));
        }, immutable_1.Map());
        return alternatives;
    };
    Formatter.prototype.makeSentences = function () {
        var _this = this;
        return this.priceCombinationsWithFreqs
            .reduce(function (accum, el) {
            var prices = el.keySeq();
            var freqs = el.valueSeq();
            var foods = prices.map(function (price) { return _this.priceMapWithCombinedFoods.get(price); });
            var partialSentence = freqs.zipWith(function (freq, food) { return freq + " order" + (freq > 1 ? "s" : "") + " of " + food; }, foods);
            var fullSentence = partialSentence.zipWith(function (partial, price) {
                return partial + " (at $" + Formatter.formatCurrency(price) + " each).";
            }, prices).toSet();
            return accum.add(fullSentence);
        }, immutable_1.Set());
    };
    Formatter.formatCurrency = function (pennies) {
        return (pennies / 100).toFixed(2);
    };
    Formatter.prototype.frequencies = function (list) {
        return list.reduce(function (accum, el) {
            return accum.has(el)
                ? accum.update(el, function (val) { return val + 1; })
                : accum.set(el, 1);
        }, immutable_1.Map({}));
    };
    return Formatter;
}());
exports.Formatter = Formatter;
