"use strict";
var immutable_1 = require("immutable");
var MapMaker = (function () {
    function MapMaker() {
    }
    MapMaker.makeMap = function (parserResults) {
        return parserResults.foodEntries
            .reduce(function (accum, el) {
            return accum.has(el.price)
                ? accum.update(el.price, function (v) { return v.add(el.food); })
                : accum.set(el.price, immutable_1.Set.of(el.food));
        }, immutable_1.Map({}));
    };
    return MapMaker;
}());
exports.MapMaker = MapMaker;
