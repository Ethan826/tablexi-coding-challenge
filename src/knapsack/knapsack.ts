/// <reference path="../../typings/index.d.ts"/>

import {List, Set, OrderedSet, Map, Iterable} from "immutable";
let hash = require("object-hash");

export class Knapsack {
  private results: Set<List<number>>;
  private memo: Object;

  constructor(prices: OrderedSet<number>, budget: number) {
    this.memo = {};
    this.results = this.computeHelper(prices.toOrderedSet(), budget);
  }

  getResults() { return this.results; }

  private hashArgs(prices, budget) {
    return hash(hash(prices.toJS()) + hash(budget));
  }

  private computeHelper(
    prices: OrderedSet<number>,
    budget: number): any { // actually Set<List<number>>
    let hashed = this.hashArgs(prices, budget);

    let memoizedResult = this.memo[hashed];
    if (typeof memoizedResult !== "undefined") {
      return memoizedResult;
    }


    // Base cases

    // If there are no prices, there can be no solution. Return empty set.
    if (prices.size === 0) {
      let results = Set([]);
      this.memo[hashed] = results;
      return results;

      // With one price, return empty set if price is not a factor of budget
      // or return a list of length budget / price filled with price.
      // E.g., for price 2 and budget 8, return List([2, 2, 2, 2]).
    } else if (prices.size === 1) {
      let onlyElement = prices.toList().get(0);
      if (budget % onlyElement === 0) {
        let results = Set([List(Array(budget / onlyElement).fill(onlyElement))]);
        this.memo[hashed] = results;
        return results;
      } else {
        let results = Set([]);
        this.memo[hashed] = results;
        return results;
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
        if (newBudget === 0) {
          let results = List([List([price])]);
          this.memo[hashed] = results;
          return results;
        };

        // Recursive call
        let recursive = this.computeHelper(newMenuItems as any, newBudget);

        // If recursion returned results, concat the item under consideration
        // onto each result and return that. If recursion didn't return results
        // return empty set.
        let results = recursive
          ? recursive.map((e: List<number>) => e.concat(price)).toOrderedSet()
          : OrderedSet([]);

        this.memo[hashed] = results;
        return results;
      });
    }
  };
}
