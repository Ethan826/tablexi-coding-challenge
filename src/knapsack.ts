/// <reference path="../typings/index.d.ts"/>

import {List, Iterable} from "immutable";
import {FoodEntry} from "./parser";

export class Knapsack {
  private possibleOrders: Iterable<{}, {}>;

  constructor(private menuItems: List<FoodEntry>, private budget: number) {
    this.possibleOrders = this.compute(menuItems, budget);
  }

  getPossibleOrders() {
    return this.possibleOrders.toJS();
  }

  // This actually returns List<List<number>>, but see
  // https://github.com/facebook/immutable-js/issues/634.
  private compute(
    menuItems: List<FoodEntry>,
    budget: number): Iterable<{}, {}> {
    // Base cases

    // If there are no menuItems, there can be no solution. Return null.
    if (menuItems.size === 0) {
      return null;

      // With one menuItem, return null if menuItem is not a factor of budget
      // or return a list of length budget / menuItem filled with menuItem.
      // E.g., for menuItem 2 and budget 8, return List([2, 2, 2, 2]).
    } else if (menuItems.size === 1) {
      let onlyElement = menuItems.get(0);
      if (budget % onlyElement.price === 0) {
        return List([List(Array(budget / onlyElement.price).fill(onlyElement))]);
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
      return menuItems.flatMap((menuItem: FoodEntry) => {
        let newBudget = budget - menuItem.price;
        let newMenuItems = this.menuItems.filter(c => {
          let menuItemCeiling = Math.min(newBudget, menuItem.price);
          return c.price <= menuItemCeiling;
        }) as List<FoodEntry>; // help the type checker
        if (newBudget === 0) return List([List([menuItem])]);
        let results = this.compute(newMenuItems, newBudget);
        return results
          ? results.map((e: List<FoodEntry>) => e.concat(menuItem))
          : null;
      });
    }
  };
}

let k = new Knapsack(
  List([
    { food: "mixed fruit", price: 215 },
    { food: "french fries", price: 275 },
    { food: "side salad", price: 335 },
    { food: "hot wings", price: 355 },
    { food: "mozzarella sticks", price: 420 },
    { food: "sampler plate", price: 580 }
  ]), 1505);

let foo = k.getPossibleOrders();
console.log(foo);
