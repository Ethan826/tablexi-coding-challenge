"use strict";
var immutable_1 = require("immutable");
var Parser = (function () {
    function Parser(data) {
        this.data = data.trim();
        var errorString = "Invalid Data";
        if (!Parser.validateData(data))
            throw errorString;
        try {
            this.lines = this.getLines();
            this.desiredPrice = this.getDesiredPrice();
            this.foodEntries = this.getFoodEntries();
        }
        catch (err) {
            throw errorString + ". " + err;
        }
    }
    Parser.prototype.getParserResults = function () {
        return { desiredPrice: this.desiredPrice, foodEntries: this.foodEntries };
    };
    Parser.validateData = function (data) {
        try {
            return / *\$(\d+)?\.\d{2} *(( *\n)*(\w| )+, *\$(\d+)?\.\d+ *)+/.test(data);
        }
        catch (_) {
            return false;
        }
    };
    Parser.prototype.getLines = function () {
        return immutable_1.List(this.data.split("\n").filter(function (s) { return s && s.length > 0; }));
    };
    Parser.prototype.getDesiredPrice = function () {
        return this.integerifyCash(this.lines
            .get(0)
            .match(/(?:\$)(\S*)/)[1]);
    };
    Parser.prototype.getFoodEntries = function () {
        var _this = this;
        return this.lines
            .slice(1)
            .reduce(function (accum, el) {
            var newEntry = _this.parseOneLine(el);
            return accum.mergeWith(function (oldVal, newVal) {
                return oldVal.concat(newVal);
            }, newEntry);
        }, immutable_1.Map());
    };
    Parser.prototype.parseOneLine = function (line) {
        var match = line.match(/((?:\w| )+)(?:,)(?:\$)(.*)/);
        return immutable_1.Map.of(this.integerifyCash(match[2]), immutable_1.Set([match[1].trim()]));
    };
    Parser.prototype.integerifyCash = function (num) {
        var asFloat = parseFloat(num) * 100;
        return parseInt(asFloat.toString());
    };
    return Parser;
}());
exports.Parser = Parser;
