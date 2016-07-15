"use strict";
var parser_1 = require("../src/parser");
var immutable_1 = require("immutable");
var TEST_DATA = "$15.05\nmixed fruit,$2.15\nfrench fries,$2.75\nside salad,$3.35\nhot wings,$3.55\nmozzarella sticks,$4.20\nsampler plate,$5.80";
describe("parser", function () {
    it("can determine the desired price", function () {
        var p = new parser_1.Parser(TEST_DATA);
        expect(p.getDesiredPrice()).toBe(15.05);
    });
    it("can create array of food items", function () {
        var p = new parser_1.Parser(TEST_DATA);
        expect(p.getFoodEntries().sort())
            .toEqual(immutable_1.List([
            { food: "mixed fruit", price: 2.15 },
            { food: "french fries", price: 2.75 },
            { food: "side salad", price: 3.35 },
            { food: "hot wings", price: 3.55 },
            { food: "mozzarella sticks", price: 4.20 },
            { food: "sampler plate", price: 5.80 }
        ]).sort());
        expect(p.getFoodEntries().sort()).not.toEqual(immutable_1.List(["flippy"]).sort());
    });
});
