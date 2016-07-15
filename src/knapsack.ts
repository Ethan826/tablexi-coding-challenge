/// <reference path="../typings/index.d.ts"/>

import {List, Iterable} from "immutable";

// This actually returns List<List<number>>, but see
// https://github.com/facebook/immutable-js/issues/634.
export class Knapsack {
  private possibleOrders: Iterable<{}, {}>;

  constructor(private candidates: List<number>, private target: number) {
    this.possibleOrders = this.compute(candidates, target);
  }

  getPossibleOrders() {
    return this.possibleOrders;
  }

  private compute(candidates, target): Iterable<{}, {}> {
    // Base cases
    if (candidates.size === 0) {
      return null;
    } else if (candidates.size === 1) {
      let onlyElement = candidates.get(0);
      if (target % onlyElement === 0) {
        return List([List(Array(target / onlyElement).fill(onlyElement))]);
      } else {
        return null;
      }

      // Recursive case. This could be refactored less cleanly to use ES6 tail
      // call optimization, but we run into excessive runtime before we encounter
      // stack overflows.
    } else {
      return candidates.flatMap((candidate: number) => {
        let newTarget = target - candidate;
        let results = this.compute(
          this.candidates.filter(e => e <= Math.min(newTarget, candidate)) as List<number>,
          newTarget
        );
        return results ? results.map((e: List<number>) => e.concat(candidate)) : null;
      });
    }
  };
}
