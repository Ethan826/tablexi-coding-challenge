import {List, Map} from "immutable";
import {FoodEntry, ParserResults} from "./interfaces";

export class Parser {
  private lines: List<string>;
  private desiredPrice: number;
  private foodEntries: List<FoodEntry>;

  constructor(private data: string) {
    this.lines = this.getLines();
    this.desiredPrice = this.getDesiredPrice();
    this.foodEntries = this.getFoodEntries();
  }

  getParserResults() {
    return { desiredPrice: this.desiredPrice, foodEntries: this.foodEntries };
  }

  private getLines(): List<string> {
    return List(this.data.split("\n"));
  }

  private getDesiredPrice(): number {
    return this.parseOneLine(this.lines.get(0)).price;
  }

  private getFoodEntries(): List<FoodEntry> {
    return this.lines
      .slice(1)
      .reduce((accum: List<FoodEntry>, el: string): List<FoodEntry> => {
        return accum.push(this.parseOneLine(el));
      }, List()) as List<FoodEntry>;
  }

  private parseOneLine(line: string): FoodEntry {
    let match = line.match(/(.*?)(?:,)?(?:\$)(.*)/);
    return { food: match[1].trim(), price: this.integerifyCash(match[2]) };
  }

  private integerifyCash(num: string): number {
    let asFloat = parseFloat(num) * 100;
    return parseInt(asFloat.toString());
  }
}
