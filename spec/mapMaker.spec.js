"use strict";
var mapMaker_1 = require("../src/mapMaker");
var immutable_1 = require("immutable");
describe("MapMaker", function () {
    var testData = immutable_1.Set([
        { food: "mixed fruit", price: 215 },
        { food: "french fries", price: 275 },
        { food: "side salad", price: 335 },
        { food: "hot wings", price: 355 },
        { food: "mozzarella sticks", price: 420 },
        { food: "sampler plate", price: 580 },
    ]);
    it("correctly builds a map from the sample data", function () {
        var expectedResults = immutable_1.Map.of(215, immutable_1.Set(["mixed fruit"]), 275, immutable_1.Set(["french fries"]), 335, immutable_1.Set(["side salad"]), 355, immutable_1.Set(["hot wings"]), 420, immutable_1.Set(["mozzarella sticks"]), 580, immutable_1.Set(["sampler plate"]));
        expect(mapMaker_1.MapMaker.makeMap(testData).equals(expectedResults)).toBe(true);
    });
    it("is covered by tests that correctly test equality", function () {
        expect(mapMaker_1.MapMaker.makeMap(testData).equals(immutable_1.Map.of(215, immutable_1.Set(["mixed fruit"]), 275, immutable_1.Set(["french fries"])))).toBe(false);
        expect(mapMaker_1.MapMaker.makeMap(testData).equals(immutable_1.Map.of(215, immutable_1.Set(["mixed garbage"]), 275, immutable_1.Set(["french fries"]), 335, immutable_1.Set(["side salad"]), 355, immutable_1.Set(["hot wings"]), 420, immutable_1.Set(["mozzarella sticks"]), 580, immutable_1.Set(["sampler plate"])))).toBe(false);
    });
});
