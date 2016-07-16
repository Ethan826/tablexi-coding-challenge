"use strict";
var formatter_1 = require("../src/formatter");
var immutable_1 = require("immutable");
describe("formatter", function () {
    var priceMap = immutable_1.Map.of(215, immutable_1.Set(["mixed fruit"]), 275, immutable_1.Set(["french fries"]), 335, immutable_1.Set(["side salad"]), 355, immutable_1.Set(["hot wings"]), 420, immutable_1.Set(["mozzarella sticks"]), 580, immutable_1.Set(["sampler plate"]));
    var priceCombinations = immutable_1.Set([
        immutable_1.List([215, 215, 215, 215, 215, 215, 215]),
        immutable_1.List([215, 355, 355, 580])
    ]);
    it("properly formats the supplied data", function () {
        var f = new formatter_1.Formatter(priceMap, priceCombinations);
        console.log(f.makeSentences());
    });
});
