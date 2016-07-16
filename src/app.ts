import {List, Map, Set} from "immutable";
import {Parser} from "./parser";
import {ParserResults, FoodEntry} from "./interfaces";
import {MapMaker} from "./mapMaker";
import {Knapsack} from "./knapsack";
import {Browser} from "./browser";

export class App {
  private desiredPrice: number;
  private priceMap: Map<number, Set<string>>;
  private priceCombinations: Set<List<number>>;

  constructor(data: string) {
    let parserResults = (new Parser(data)).getParserResults();
    this.desiredPrice = parserResults.desiredPrice;
    this.priceMap = MapMaker.makeMap(parserResults.foodEntries);
    this.priceCombinations = Knapsack.compute(
      this.priceMap.keySeq().toSet().toList(),
      this.desiredPrice
    ).toSet() as any;
  }

  getDesiredPrice() {
    return this.desiredPrice;
  }
}

let a = new App(`$15.05
mixed fruit,$2.15
french fries,$2.75
side salad,$3.35
hot wings,$3.55
mozzarella sticks,$4.20
sampler plate,$5.80`);

console.log(a.priceMap);
