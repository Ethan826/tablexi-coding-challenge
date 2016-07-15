import {List, Map, Set} from "immutable";
import {Parser} from "./parser";
import {ParserResults, FoodEntry} from "./interfaces";
import {MapMaker} from "./mapMaker";
import {Knapsack} from "./knapsack";

const TEST_DATA = `$15.05
mixed fruit,$2.15
french fries,$2.75
side salad,$3.35
hot wings,$3.55
mozzarella sticks,$4.20
sampler plate,$5.80`;

export class App {
  private desiredPrice: number;
  private priceMap: Map<number, Set<string>>;
  private priceCombinations: Set<List<number>>;

  constructor() {
    let parserResults = (new Parser(TEST_DATA)).getParserResults();
    this.desiredPrice = parserResults.desiredPrice;
    this.priceMap = MapMaker.makeMap(parserResults);
    this.priceCombinations = Knapsack.compute(
      this.priceMap.keySeq().toSet().toList(),
      this.desiredPrice
    ).toSet() as any;
  }
}

let a = new App();
