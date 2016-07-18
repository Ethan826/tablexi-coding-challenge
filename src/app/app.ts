import {List, Map, Set} from "immutable";
import {Parser, ParserResults} from "../parser/parser";
import {Knapsack} from "../knapsack/knapsack";
import {Browser} from "../browser/browser";
import {Formatter} from "../formatter/formatter";

export class App {
  private desiredPrice: number;
  private priceMap: Map<number, Set<string>>;
  private priceCombinations: Set<List<number>>;
  private results: Set<Set<string>>;

  constructor(data: string) { // data is the contents of the file
    let parserResults: ParserResults = (new Parser(data)).getParserResults();
    this.desiredPrice = parserResults.desiredPrice;
    this.priceMap = parserResults.foodEntries;
    let knapsack = new Knapsack(
      this.priceMap.keySeq().toSet(), // Seq of unique prices
      this.desiredPrice
    );
    this.priceCombinations = knapsack.getResults();
    let formatter = new Formatter(this.priceMap, this.priceCombinations);
    this.results = formatter.getSentences();
  }

  getResults(): Set<Set<string>> {
    return this.results;
  }

  getDesiredPrice() {
    return this.desiredPrice;
  }
}

let f = require("fs").readFileSync("/home/ethan/Desktop/tablexi-coding-challenge/spec/helpers/yesresults.txt", "utf-8");
let a = new App(f);
