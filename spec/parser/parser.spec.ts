/// <reference path="../../typings/index.d.ts"/>

import {Parser} from "../../src/parser/parser";
import {Set} from "immutable";

import fs = require("fs");


describe("parser", () => {

  let testData = `$15.05
mixed fruit,$2.15
french fries,$2.75
side salad,$3.35
hot wings,$3.55
mozzarella sticks,$4.20
sampler plate,$5.80`;

  let expectedResults = Set([
    { food: "mixed fruit", price: 215 },
    { food: "french fries", price: 275 },
    { food: "side salad", price: 335 },
    { food: "hot wings", price: 355 },
    { food: "mozzarella sticks", price: 420 },
    { food: "sampler plate", price: 580 }]);

  it("can determine the desired price from test data", () => {
    let p = new Parser(testData);
    expect(p.getParserResults().desiredPrice).toBe(1505);
  });

  it("can create Set of food items from test data", () => {
    let p = new Parser(testData);
    expect(p.getParserResults().foodEntries).toEqual(expectedResults);

    // Sanity check to make sure Jasmine and Immutable are playing nicely
    expect(p.getParserResults().foodEntries.sort()).not.toEqual(Set(["flippy"]));
  });

  it("can parse imported data", () => {
    let data = fs.readFileSync("./spec/helpers/menu.txt", "utf-8");
    let p = new Parser(data);
    expect(p.getParserResults().foodEntries).toEqual(expectedResults)
  });

  it("can validate data", () => {
    expect(Parser.validateData(testData)).toBe(true);
  });
});
