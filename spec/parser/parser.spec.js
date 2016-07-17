"use strict";
var parser_1 = require("../../src/parser/parser");
var immutable_1 = require("immutable");
var fs = require("fs");
describe("parser", function () {
    var testData = "$15.05\nmixed fruit,$2.15\nfrench fries,$2.75\nside salad,$3.35\nhot wings,$3.55\nmozzarella sticks,$4.20\nsampler plate,$5.80";
    var expectedResults = immutable_1.Set([
        { food: "mixed fruit", price: 215 },
        { food: "french fries", price: 275 },
        { food: "side salad", price: 335 },
        { food: "hot wings", price: 355 },
        { food: "mozzarella sticks", price: 420 },
        { food: "sampler plate", price: 580 }]);
    it("can determine the desired price from test data", function () {
        var p = new parser_1.Parser(testData);
        expect(p.getParserResults().desiredPrice).toBe(1505);
    });
    it("can create Set of food items from test data", function () {
        var p = new parser_1.Parser(testData);
        expect(p.getParserResults().foodEntries).toEqual(expectedResults);
        expect(p.getParserResults().foodEntries.sort()).not.toEqual(immutable_1.Set(["flippy"]));
    });
    it("can parse imported data", function () {
        var data = fs.readFileSync("./spec/helpers/menu.txt", "utf-8");
        var p = new parser_1.Parser(data);
        expect(p.getParserResults().foodEntries).toEqual(expectedResults);
    });
    it("can validate data", function () {
        expect(parser_1.Parser.validateData(testData)).toBe(true);
    });
});
