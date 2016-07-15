/// <reference path="../typings/index.d.ts"/>

import {List, Set, Map, Iterable} from "immutable";
import {FoodEntry} from "./parser";

export class Knapsack {
  private priceMap: Map<number, List<FoodEntry>>;
  private prices: Set<number>;
  private possiblePriceCombos: Iterable<{}, {}>;
  private possibleOrders: Iterable<{}, {}>;

  constructor(menuItems: Array<FoodEntry>, private budget: number) {
    this.menuItems = getPriceMap(menuItems);
    this.prices = (this.menuItems.map(i => i.price)).toSet();
    console.log(this.prices);
    this.possiblePriceCombos = this.compute(this.prices, budget);
  }

  getPossibleOrders() {
    return this.possiblePriceCombos.toJS();
  }

  // This actually returns List<List<FoodEntry>>, but see
  // https://github.com/facebook/immutable-js/issues/634.
  private compute(
    menuItems: Set<number>,
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
        let newMenuItems = this.prices.filter(c => {
          let menuItemCeiling = Math.min(newBudget, menuItem);
          return c <= menuItemCeiling;
        }) as Set<number>; // help the type checker
        if (newBudget === 0) return List([List([menuItem])]);
        let results = this.compute(newMenuItems, newBudget);
        return results
          ? results.map((e: List<FoodEntry>) => e.concat(menuItem))
          : null;
      });
    }
  };

  private getPermutations() {
    let allPrices = this.menuItems.map(i => i.price) as List<number>;
    let repeats = this.getRepeats(allPrices) as Set<number>;
  }

  private getPriceMap(menuItems: FoodEntry[]): any {
    return menuItems
      .reduce((accum: Map<string, number>, el: FoodItem) => {
        return accum.has(el.price)
          ? accum.update(el.price, v => v.concat(el.food))
          : accum.set(el.price, List([el.food]));
      }, Map({}));
  }
}

let k = new Knapsack(
  [ { food: "mixed fruit", price: 215 },
    { food: "dipsy", price: 215 },
    { food: "french fries", price: 275 },
    { food: "side salad", price: 335 },
    { food: "hot wings", price: 355 },
    { food: "mozzarella sticks", price: 420 },
    { food: "sampler plate", price: 580 },
    { food: "fart", price: 580 }
  ], 1505);

let foo = k.getPossibleOrders();
console.log(foo);
