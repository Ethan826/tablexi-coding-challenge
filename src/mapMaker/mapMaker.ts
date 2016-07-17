import {List, Map, Set} from "immutable";
import {ParserResults, FoodEntry} from "../interfaces/interfaces";

export class MapMaker {
  static makeMap(foodEntries: Set<FoodEntry>): Map<number, Set<string>> {
    /* Given a set of food entries of the form
     * [ {food: "mixed fruit", price: 215},
     *   {food: "french fries", price: 275},
     *   {food: "hummus ice cream", price:  215} ]
     * return
     * { 215: ["mixed fruit", "hummus ice cream"],
     *   275: ["french fries"] }
     */
    return foodEntries
      .reduce((accum: Map<number, Set<string>>, el: FoodEntry): any => {
        return accum.has(el.price)
          ? accum.update(el.price, v => { return v.add(el.food) as any; })
          : accum.set(el.price, Set.of(el.food));
      }, Map({}));
  }
}
