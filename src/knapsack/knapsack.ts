/// <reference path="../../typings/index.d.ts"/>

import {List, Set, Map, Iterable} from "immutable";

export class Knapsack {
  private results;

  constructor(prices: List<number> | Set<number>, budget: number) {
    this.results = this.computeHelper(prices, budget);
  }

  getResults() { return this.results; }

  private computeHelper(
    prices: List<number> | Set<number>,
    budget: number): any { // actually Set<List<number>>
    // Base cases

    // If there are no prices, there can be no solution. Return null.
    if (prices.size === 0) {
      return null;

      // With one price, return null if price is not a factor of budget
      // or return a list of length budget / price filled with price.
      // E.g., for price 2 and budget 8, return List([2, 2, 2, 2]).
    } else if (prices.size === 1) {
      let onlyElement = prices.toList().get(0);
      if (budget % onlyElement === 0) {
        return Set([List(Array(budget / onlyElement).fill(onlyElement))]);
      } else {
        return null;
      }

      // Recursive case. Divide-and-conquer algorithm compiles and filters
      // results by recurring on each price price, subtracting that price
      // from the budget and filtering the list of price prices to be less
      // than or equal to both the new budget and the current price. See
      // README for additional information.
    } else {
      return prices.flatMap((price: number) => {
        let newBudget = budget - price; // If we buy this item, what is our new budget?

        // Remove items that are more than our budget and more than the item
        // under consideration.
        let newMenuItems = prices.filter(c => {
          let priceCeiling = Math.min(newBudget, price);
          return c <= priceCeiling;
        });

        // No recursion if the item under consideration exactly zeroes our
        // budget.
        if (newBudget === 0) return List([List([price])]);

        // Recursive call
        let results = this.computeHelper(newMenuItems as any, newBudget);

        // If recursion returned results, concat the item under consideration
        // onto each result and return that. If recursion didn't return results
        // return null.
        return results
          ? results.map((e: List<number>) => e.concat(price)).toSet()
          : null;
      });
    }
  };
}
