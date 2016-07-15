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

  it("can create array of food items", () => {
    let p = new Parser(TEST_DATA);
    expect(p.getFoodEntries().sort())
      .toEqual(List([
        { food: "mixed fruit", price: 215 },
        { food: "french fries", price: 275 },
        { food: "side salad", price: 335 },
        { food: "hot wings", price: 355 },
        { food: "mozzarella sticks", price: 420 },
        { food: "sampler plate", price: 580 }
      ]).sort());

    // Sanity check to make sure Jasmine and Immutable are playing nicely
    expect(p.getFoodEntries().sort()).not.toEqual(List(["flippy"]).sort());
  });
});
