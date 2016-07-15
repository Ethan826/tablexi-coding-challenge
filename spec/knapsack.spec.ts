/// <reference path="../typings/index.d.ts"/>
import {Knapsack} from "../src/knapsack";
import {List} from "immutable";
import {FoodEntry} from "../src/parser";

describe("knapsack", () => {
  it("correctly computes the supplied problem", () => {
    let expectedResult = [
      [
        { food: "mixed fruit", price: 215 },
        { food: "mixed fruit", price: 215 },
        { food: "mixed fruit", price: 215 },
        { food: "mixed fruit", price: 215 },
        { food: "mixed fruit", price: 215 },
        { food: "mixed fruit", price: 215 },
        { food: "mixed fruit", price: 215 }
      ], [
        { food: "mixed fruit", price: 215 },
        { food: "hot wings", price: 355 },
        { food: "hot wings", price: 355 },
        { food: "sampler plate", price: 580 }
      ]
    ];

    let menuItems = List([
      { food: "mixed fruit", price: 215 },
      { food: "french fries", price: 275 },
      { food: "side salad", price: 335 },
      { food: "hot wings", price: 355 },
      { food: "mozzarella sticks", price: 420 },
      { food: "sampler plate", price: 580 }
    ]).sort() as List<FoodEntry>;

    let result = (new Knapsack(menuItems, 1505)).getPossibleOrders();
    expect(result).toEqual(expectedResult);
  });
});
