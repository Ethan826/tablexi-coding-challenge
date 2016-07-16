import {List, Set, Map} from "immutable";
import {FoodEntry, ParserResults} from "./interfaces";

export class Parser {
  private lines: List<string>;
  private desiredPrice: number;
  private foodEntries: Set<FoodEntry>;

  constructor(private data: string) {
    this.lines = this.getLines();
    this.desiredPrice = this.getDesiredPrice();
    this.foodEntries = this.getFoodEntries();
  }

  getParserResults() {
    return { desiredPrice: this.desiredPrice, foodEntries: this.foodEntries };
  }

  private getLines(): List<string> {
    console.log(this.data);
    return List(this.data.split("\n").filter(s => s && s.length > 0));
  }

  private getDesiredPrice(): number {
    return this.parseOneLine(this.lines.get(0)).price;
  }

  private getFoodEntries(): Set<FoodEntry> {
    return this.lines
      .slice(1)
      .reduce((accum: List<FoodEntry>, el: string): List<FoodEntry> => {
        return accum.push(this.parseOneLine(el));
      }, List()).toSet() as any;
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
