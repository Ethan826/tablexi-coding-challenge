import {List, Map, Set} from "immutable";
import {ParserResults, FoodEntry} from "./interfaces";

export class MapMaker {
  static makeMap(foodEntries: Set<FoodEntry>): Map<number, Set<string>> {
    return foodEntries
      .reduce((accum: Map<number, Set<string>>, el: FoodEntry): any => {
        return accum.has(el.price)
          ? accum.update(el.price, v => { return v.add(el.food) as any; })
          : accum.set(el.price, Set.of(el.food));
      }, Map({}));
  }
}
