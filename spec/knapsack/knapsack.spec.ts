/// <reference path="../../typings/index.d.ts"/>
import {Knapsack} from "../../src/knapsack/knapsack";
import {List, Set} from "immutable";

describe("knapsack", () => {
  let expectedResultGiven = Set([
    List([215, 215, 215, 215, 215, 215, 215]),
    List([215, 355, 355, 580])
  ]);

  it("correctly computes the supplied problem", () => {
    let expectedResultGiven = Set([
      List([215, 215, 215, 215, 215, 215, 215]),
      List([215, 355, 355, 580])
    ]);

    let menuItems = Set([215, 275, 335, 355, 420, 580]);

    expect((new Knapsack(menuItems, 1505)).getResults()).toEqual(expectedResultGiven);
  });

  it("correctly computes the supplied problem without extraneous numbers", () => {
    expect((new Knapsack(Set([215, 355, 580]), 1505)).getResults()).toEqual(expectedResultGiven);
  });

  it("finds no results when supplied problem is altered", () => {
    expect((new Knapsack(Set([225, 355, 580]), 1505)).getResults()).not.toEqual(expectedResultGiven);
  });

  it("correctly computes additional data", () => {
    // Wrapping in IIFE for namespacing
    (() => {
      let expectedResult = Set([List([2, 2, 2]), List([3, 3]), List([2, 4])]);
      expect((new Knapsack(Set([2, 3, 4]), 6)).getResults()).toEqual(expectedResult);
    })();

    (() => {
      let expectedResult = Set([List([2, 2, 2]), List([3, 3])]);
      expect((new Knapsack(Set([2, 3, 5]), 6)).getResults()).toEqual(expectedResult);
    })();

    (() => {
      let expectedResult = Set([
        List([1, 1, 1, 1]),
        List([1, 1, 2]),
        List([2, 2]),
        List([1, 3])]);

      expect((new Knapsack(Set([1, 2, 3]), 4)).getResults()).toEqual(expectedResult);
    })();
  });
});
