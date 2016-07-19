"use strict";
var app_1 = require("../../src/app/app");
var immutable_1 = require("immutable");
var fs = require("fs");
describe("app data parsing", function () {
    var errorName = "Invalid Data";
    it("throws " + errorName + " malformed data", function () {
        var prefix = "./spec/helpers/malformed";
        [(prefix + "1.txt"), (prefix + "2.txt"), (prefix + "3.txt"), (prefix + "4.txt")]
            .forEach(function (bad) {
            var data = fs.readFileSync(bad, "utf-8");
            expect(function () { return new app_1.App(data); }).toThrow(errorName);
        });
    });
    it("does not throw an error with valid data", function () {
        var prefix = "./spec/helpers/valid";
        [(prefix + "1.txt"), (prefix + "2.txt"), (prefix + "3.txt")].forEach(function (good) {
            var data = fs.readFileSync(good, "utf-8");
            new app_1.App(data);
            expect(function () { return new app_1.App(data); }).not.toThrow();
        });
    });
    it("returns an empty Set for no results", function () {
        var data = fs.readFileSync("./spec/helpers/noresults.txt", "utf-8");
        var results = (new app_1.App(data)).getResults();
        expect(results).toBe(immutable_1.Set());
    });
    it("returns results correctly", function () {
        var expectedResults = immutable_1.Set([
            immutable_1.Set([
                "2 orders of housemade crab fusilli (at $2.00 each).",
                "2 orders of pickles or haggis gum (at $3.00 each)."
            ]),
            immutable_1.Set([
                "5 orders of housemade crab fusilli (at $2.00 each)."
            ]),
            immutable_1.Set([
                "1 order of housemade crab fusilli (at $2.00 each).",
                "1 order of pickle jam (at $8.00 each)."
            ]),
            immutable_1.Set([
                "2 orders of pickles or haggis gum (at $3.00 each).",
                "1 order of labrea tar (at $4.00 each)."
            ]),
            immutable_1.Set([
                "3 orders of housemade crab fusilli (at $2.00 each).",
                "1 order of labrea tar (at $4.00 each)."
            ]),
            immutable_1.Set([
                "1 order of housemade crab fusilli (at $2.00 each).",
                "2 orders of labrea tar (at $4.00 each)."
            ]),
            immutable_1.Set([
                "1 order of housemade crab fusilli (at $2.00 each).",
                "1 order of pickles or haggis gum (at $3.00 each).",
                "1 order of github flavored markdown (at $5.00 each)."
            ]),
            immutable_1.Set([
                "2 orders of github flavored markdown (at $5.00 each)."
            ])
        ]);
        var data = fs.readFileSync("./spec/helpers/yesresults.txt", "utf-8");
        var results = (new app_1.App(data)).getResults();
        expect(results.equals(expectedResults)).toBe(true);
    });
});
