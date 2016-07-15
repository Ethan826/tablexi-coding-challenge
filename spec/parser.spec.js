"use strict";
var parser_1 = require("../src/parser");
var immutable_1 = require("immutable");
var TEST_DATA = "$15.05\nmixed fruit,$2.15\nfrench fries,$2.75\nside salad,$3.35\nhot wings,$3.55\nmozzarella sticks,$4.20\nsampler plate,$5.80";
describe("parser", function () {
    it("can determine the desired price", function () {
        var p = new parser_1.Parser(TEST_DATA);
        expect(p.getParserResults().desiredPrice).toBe(1505);
    });
    it("can create Set of food items", function () {
        var p = new parser_1.Parser(TEST_DATA);
        expect(p.getParserResults().foodEntries.sort())
            .toEqual(immutable_1.Set([
            { food: "mixed fruit", price: 215 },
            { food: "french fries", price: 275 },
            { food: "side salad", price: 335 },
            { food: "hot wings", price: 355 },
            { food: "mozzarella sticks", price: 420 },
            { food: "sampler plate", price: 580 }
        ]).sort());
        expect(p.getParserResults().foodEntries.sort()).not.toEqual(immutable_1.Set(["flippy"]).sort());
    });
});
