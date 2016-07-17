"use strict";
var parser_1 = require("../../src/parser/parser");
var immutable_1 = require("immutable");
var fs = require("fs");
describe("parser", function () {
    var testData = "$15.05\nmixed fruit,$2.15\nvanilla calamari,$2.15\nfrench fries,$2.75\nside salad,$3.35\nhot wings,$3.55\nmozzarella sticks,$4.20\nsampler plate,$5.80";
    var expectedResults = immutable_1.Map.of(215, immutable_1.Set(["mixed fruit", "vanilla calamari"]), 275, immutable_1.Set(["french fries"]), 335, immutable_1.Set(["side salad"]), 355, immutable_1.Set(["hot wings"]), 420, immutable_1.Set(["mozzarella sticks"]), 580, immutable_1.Set(["sampler plate"]));
    it("can determine the desired price from test data", function () {
        var p = new parser_1.Parser(testData);
        expect(p.getParserResults().desiredPrice).toBe(1505);
    });
    it("can create Set of food items from test data", function () {
        var p = new parser_1.Parser(testData);
        expect(p.getParserResults().foodEntries.equals(expectedResults)).toEqual(true);
    });
    it("can parse imported data", function () {
        var data = fs.readFileSync("./spec/helpers/menu.txt", "utf-8");
        var p = new parser_1.Parser(data);
        expect(p.getParserResults().foodEntries.equals(expectedResults)).toEqual(true);
    });
    it("can validate data", function () {
        expect(parser_1.Parser.validateData(testData)).toBe(true);
    });
});
