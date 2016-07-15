"use strict";
var immutable_1 = require("immutable");
var Parser = (function () {
    function Parser(data) {
        var _this = this;
        this.data = data;
        var lineArray = data.split("\n");
        this.desiredPrice = this.parseOneLine(lineArray[0]).price;
        this.foodEntries = lineArray
            .slice(1)
            .reduce(function (accum, el) {
            return accum.push(_this.parseOneLine(el));
        }, immutable_1.List());
    }
    Parser.prototype.getDesiredPrice = function () {
        return this.desiredPrice;
    };
    Parser.prototype.getFoodEntries = function () {
        return this.foodEntries;
    };
    Parser.prototype.parseOneLine = function (line) {
        var match = line.match(/(.*?)(?:,)?(?:\$)(.*)/);
        return { food: match[1].trim(), price: parseFloat(match[2]) };
    };
    return Parser;
}());
exports.Parser = Parser;
