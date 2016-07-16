import {List, Map, Set} from "immutable";
import {Parser} from "./parser";
import {ParserResults, FoodEntry} from "./interfaces";
import {MapMaker} from "./mapMaker";
import {Knapsack} from "./knapsack";
import {Browser} from "./browser";
import {Formatter} from "./formatter";

export class App {
  private desiredPrice: number;
  private priceMap: Map<number, Set<string>>;
  private priceCombinations: Set<List<number>>;
  private results: Set<Set<string>>;

  constructor(data: string) {
    let parserResults = (new Parser(data)).getParserResults();
    this.desiredPrice = parserResults.desiredPrice;
    this.priceMap = MapMaker.makeMap(parserResults.foodEntries);
    this.priceCombinations = Knapsack.compute(
      this.priceMap.keySeq().toSet().toList(),
      this.desiredPrice
    ).toSet() as any;
    let formatter = new Formatter(this.priceMap, this.priceCombinations);
    this.results = formatter.makeSentences();
  }

  getResults(): Set<Set<string>> {
    return this.results;
  }
}
