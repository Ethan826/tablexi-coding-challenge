"use strict";
var formatter_1 = require("../../src/formatter/formatter");
var immutable_1 = require("immutable");
describe("formatter", function () {
    var priceMap = immutable_1.Map.of(215, immutable_1.Set(["mixed fruit", "bubble yum"]), 275, immutable_1.Set(["french fries"]), 335, immutable_1.Set(["side salad"]), 355, immutable_1.Set(["hot wings"]), 420, immutable_1.Set(["mozzarella sticks"]), 580, immutable_1.Set(["sampler plate"]));
    var priceCombinations = immutable_1.Set([
        immutable_1.List([215, 215, 215, 215, 215, 215, 215]),
        immutable_1.List([215, 355, 355, 580])
    ]);
    var expectedResult = immutable_1.Set([
        immutable_1.Set(["7 orders of mixed fruit or bubble yum (at $2.15 each)."]),
        immutable_1.Set([
            "1 order of mixed fruit or bubble yum (at $2.15 each).",
            "1 order of mixed fruit or bubble yum (at $2.15 each).",
            "2 orders of hot wings (at $3.55 each).",
            "1 order of sampler plate (at $5.80 each)."
        ])
    ]);
    it("properly formats the supplied data", function () {
        var f = new formatter_1.Formatter(priceMap, priceCombinations);
        expect(f.makeSentences().equals(expectedResult)).toBe(true);
        expect(f.makeSentences().equals(immutable_1.Set([immutable_1.Set(["foo"])]))).toBe(false);
    });
});
