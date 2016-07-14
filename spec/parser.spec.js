"use strict";
var parser_1 = require("../src/parser");
var immutable_1 = require("immutable");
var TEST_DATA = "$15.05\n    mixed fruit,$2.15\n    french fries,$2.75\n    side salad,$3.35\n    hot wings,$3.55\n    mozzarella sticks,$4.20\n    sampler plate,$5.80";
describe("parser", function () {
    it("can determine the desired price", function () {
        var p = new parser_1.Parser(TEST_DATA);
        expect(p.getDesiredPrice()).toBe(15.05);
    });
    it("can extract food items", function () {
        var p = new parser_1.Parser(TEST_DATA);
        expect(p.getFoods().sort)
            .toEqual(immutable_1.List([
            "mixed fruit", "french fries", "side salad", "hot wings",
            "mozzarella sticks", "sampler plate", "flippy"
        ]).sort);
    });
});
