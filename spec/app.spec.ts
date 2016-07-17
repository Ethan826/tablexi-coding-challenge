/// <reference path="../../typings/index.d.ts"/>

import {App} from "../../src/ts/app";
import {Set, Map, List} from "immutable";
import fs = require("fs");

describe("app data parsing", () => {
  let errorName = "Invalid Data";

  it(`throws ${errorName} malformed data`, () => {
    let prefix = "./spec/helpers/malformed";
    [`${prefix}1.txt`, `${prefix}2.txt`, `${prefix}3.txt`, `${prefix}4.txt`]
      .forEach(bad => {
        let data = fs.readFileSync(bad, "utf-8");
        expect(() => new App(data)).toThrow(errorName);
      });
  });

  it("does not throw an error with valid data", () => {
    let prefix = "./spec/helpers/valid";
    [`${prefix}1.txt`, `${prefix}2.txt`, `${prefix}3.txt`].forEach(good => {
      let data = fs.readFileSync(good, "utf-8");
      expect(() => new App(data)).not.toThrow();
    });
  });

  it("returns an empty Set for no results", () => {
    let data = fs.readFileSync("./spec/helpers/noresults.txt", "utf-8");
    let results = (new App(data)).getResults();
    expect(results).toBe(Set());
  });

  it("returns results correctly", () => {
    let expectedResults =
      Set([
        Set([
          "2 orders of housemade crab fusilli (at $2.00 each).",
          "2 orders of pickles or haggis gum (at $3.00 each)."
        ]),
        Set([
          "5 orders of housemade crab fusilli (at $2.00 each)."
        ]),
        Set([
          "1 order of housemade crab fusilli (at $2.00 each).",
          "1 order of pickle jam (at $8.00 each)."
        ]),
        Set([
          "2 orders of pickles or haggis gum (at $3.00 each).",
          "1 order of labrea tar (at $4.00 each)."
        ]),
        Set([
          "3 orders of housemade crab fusilli (at $2.00 each).",
          "1 order of labrea tar (at $4.00 each)."
        ]),
        Set([
          "1 order of housemade crab fusilli (at $2.00 each).",
          "2 orders of labrea tar (at $4.00 each)."
        ]),
        Set([
          "1 order of housemade crab fusilli (at $2.00 each).",
          "1 order of pickles or haggis gum (at $3.00 each).",
          "1 order of github flavored markdown (at $5.00 each)."
        ]),
        Set([
          "2 orders of github flavored markdown (at $5.00 each)."
        ])
      ]);

    let data = fs.readFileSync("./spec/helpers/yesresults.txt", "utf-8");
    let results = (new App(data)).getResults();
    expect(results.equals(expectedResults)).toBe(true);
  });
});
