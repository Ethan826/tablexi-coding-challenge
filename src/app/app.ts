import {List, Map, Set} from "immutable";
import {Parser} from "../parser/parser";
import {MapMaker} from "../mapMaker/mapMaker";
import {Knapsack} from "../knapsack/knapsack";
import {Browser} from "../browser/browser";
import {Formatter} from "../formatter/formatter";

export class App {
  private desiredPrice: number;
  private priceMap: Map<number, Set<string>>;
  private priceCombinations: Set<List<number>>;
  private results: Set<Set<string>>;

  // The data argument is the contents of the file.
  constructor(data: string) {
    let parserResults = (new Parser(data)).getParserResults();
    this.desiredPrice = parserResults.desiredPrice;
    this.priceMap = parserResults.foodEntries;
    this.priceCombinations = Knapsack.compute(
      this.priceMap.keySeq().toSet(), // Set of unique prices
      this.desiredPrice
    ).toSet() as any;
    let formatter = new Formatter(this.priceMap, this.priceCombinations);
    this.results = formatter.makeSentences();
  }

  getResults(): Set<Set<string>> {
    return this.results;
  }

  getDesiredPrice() {
    return this.desiredPrice;
  }
}
