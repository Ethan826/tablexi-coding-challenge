/// <reference path="../typings/index.d.ts"/>

import {Parser} from "../src/parser";
import {List} from "immutable";

const TEST_DATA = `$15.05
    mixed fruit,$2.15
    french fries,$2.75
    side salad,$3.35
    hot wings,$3.55
    mozzarella sticks,$4.20
    sampler plate,$5.80`;

describe("parser", () => {
  it("can determine the desired price", () => {
    let p = new Parser(TEST_DATA);
    expect(p.getDesiredPrice()).toBe(15.05);
  });

  it("can extract food items", () => {
    let p = new Parser(TEST_DATA);
    expect(p.getFoods().sort)
      .toEqual(List([
        "mixed fruit", "french fries", "side salad", "hot wings",
        "mozzarella sticks", "sampler plate", "flippy"
      ]).sort);
  });
});