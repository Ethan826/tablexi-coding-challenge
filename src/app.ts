import {List, Map, Set} from "immutable";
import {Parser} from "./parser";
import {ParserResults, FoodEntry} from "./interfaces";
import {MapMaker} from "./mapMaker";
import {Knapsack} from "./knapsack";
import {Browser} from "./browser";

export class App {
  private browser: Browser;
  private desiredPrice: number;
  private priceMap: Map<number, Set<string>>;
  private priceCombinations: Set<List<number>>;

  constructor(data: string) {
    this.browser = new Browser();
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
