/// <reference path="../../typings/index.d.ts"/>

import {Parser} from "../../src/parser/parser";
import {Map, Set} from "immutable";

import fs = require("fs");


describe("parser", () => {

  let testData = `$15.05
mixed fruit,$2.15
vanilla calamari,$2.15
french fries,$2.75
side salad,$3.35
hot wings,$3.55
mozzarella sticks,$4.20
sampler plate,$5.80`;

  let expectedResults = Map.of(
    215, Set(["mixed fruit", "vanilla calamari"]),
    275, Set(["french fries"]),
    335, Set(["side salad"]),
    355, Set(["hot wings"]),
    420, Set(["mozzarella sticks"]),
    580, Set(["sampler plate"])
  );

  it("can determine the desired price from test data", () => {
    let p = new Parser(testData);
    expect(p.getParserResults().desiredPrice).toBe(1505);
  });

  it("can create Set of food items from test data", () => {
    let p = new Parser(testData);
    expect(p.getParserResults().foodEntries.equals(expectedResults)).toEqual(true);
  });

  it("can parse imported data", () => {
    let data = fs.readFileSync("./spec/helpers/menu.txt", "utf-8");
    let p = new Parser(data);
    expect(p.getParserResults().foodEntries.equals(expectedResults)).toEqual(true);
  });

  it("can validate data", () => {
    expect(Parser.validateData(testData)).toBe(true);
  });
});
