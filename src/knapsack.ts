/// <reference path="../typings/index.d.ts"/>

import {List, Iterable} from "immutable";

export class Knapsack {
  private possibleOrders: Iterable<{}, {}>;

  constructor(private menuItems: List<number>, private budget: number) {
    this.possibleOrders = this.compute(menuItems, budget);
  }

  getPossibleOrders() {
    return this.possibleOrders;
  }

  // This actually returns List<List<number>>, but see
  // https://github.com/facebook/immutable-js/issues/634.
  private compute(menuItems, budget): Iterable<{}, {}> {
    // Base cases

    // If there are no menuItems, there can be no solution. Return null.
    if (menuItems.size === 0) {
      return null;

      // With one menuItem, return null if menuItem is not a factor of budget
      // or return a list of length budget / menuItem filled with menuItem.
      // E.g., for menuItem 2 and budget 8, return List([2, 2, 2, 2]).
    } else if (menuItems.size === 1) {
      let onlyElement = menuItems.get(0);
      if (budget % onlyElement === 0) {
        return List([List(Array(budget / onlyElement).fill(onlyElement))]);
      } else {
        return null;
      }

      /*
       * Recursive case. Divide-and-conquer algorithm compiles and filters
       * results by recurring on each menuItem price, subtracting that price
       * from the budget and filtering the list of menuItem prices to be less
       * than or equal to both the new budget and the current menuItem. See
       * README for additional information.
       */
    } else {
      return menuItems.flatMap((menuItem: number) => {
        let newBudget = budget - menuItem;
        let newMenuItems = this.menuItems.filter(c => {
          let menuItemCeiling = Math.min(newBudget, menuItem);
          return c <= menuItemCeiling;
        }) as List<number>; // help the type checker
        if (newBudget === 0) return List([List([menuItem])]);
        let results = this.compute(newMenuItems, newBudget);
        return results
          ? results.map((e: List<number>) => e.concat(menuItem))
          : null;
      });
    }
  };
}

console.log((new Knapsack(List([2, 3, 4]), 6)).getPossibleOrders());
