/// <reference path="../../typings/index.d.ts"/>

import {MapMaker} from "../src/mapMaker";
import {Map, Set} from "immutable";

describe("MapMaker", () => {
  let testData = Set([
    { food: "mixed fruit", price: 215 },
    { food: "french fries", price: 275 },
    { food: "side salad", price: 335 },
    { food: "hot wings", price: 355 },
    { food: "mozzarella sticks", price: 420 },
    { food: "sampler plate", price: 580 },
  ]);

  it("correctly builds a map from the sample data", () => {

    let expectedResults = Map.of(
      215, Set(["mixed fruit"]),
      275, Set(["french fries"]),
      335, Set(["side salad"]),
      355, Set(["hot wings"]),
      420, Set(["mozzarella sticks"]),
      580, Set(["sampler plate"])
    );

    // Jasmine cannot test this, so rely on Immutable.js supplied equality
    expect(MapMaker.makeMap(testData).equals(expectedResults)).toBe(true);
  });

  it("is covered by tests that correctly test equality", () => {
    expect(MapMaker.makeMap(testData).equals(Map.of(
      215, Set(["mixed fruit"]),
      275, Set(["french fries"])
    ))).toBe(false);

    expect(MapMaker.makeMap(testData).equals(Map.of(
      215, Set(["mixed garbage"]),
      275, Set(["french fries"]),
      335, Set(["side salad"]),
      355, Set(["hot wings"]),
      420, Set(["mozzarella sticks"]),
      580, Set(["sampler plate"])
    ))).toBe(false);
  });
});
