/// <reference path="../typings/index.d.ts"/>
import {Knapsack} from "../src/knapsack";
import {List} from "immutable";

describe("knapsack", () => {
  it("correctly computes the supplied problem", () => {
    let expectedResult = List([List([215, 215, 215, 215, 215, 215, 215]), List([215, 355, 355, 580])]).toJS();
    let k = new Knapsack(List([215, 275, 335, 355, 420, 580]), 1505);
    expect(k.getPossibleOrders().toJS()).toEqual(expectedResult);
  });
});
