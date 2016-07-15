/// <reference path="../typings/index.d.ts"/>

import {List} from "immutable";

// This actually returns List<List<number>>, but see
// https://github.com/facebook/immutable-js/issues/634.
let knapsack = (candidates: List<number>, target: number): any => {
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

    // Recursive case. This could be refactored to use ES6 tail call
    // optimization, but we run into excessive runtime before we encounter
    // stack overflows.
  } else {
    return candidates.flatMap((candidate: number): List<List<number>> => {
      let newTarget = target - candidate;
      let results = knapsack(
        candidates.filter(e => e <= Math.min(newTarget, candidate)) as List<number>,
        newTarget
      );
      return results ? results.map(e => e.concat(candidate)) : null;
    });
  }
};

console.log(knapsack(List([215, 275, 335, 355, 420, 580]), 1505));
