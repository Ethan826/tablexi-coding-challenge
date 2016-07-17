import {List, Set, Map} from "immutable";
import {FoodEntry, ParserResults} from "./interfaces";

export class Parser {
  private data: string;
  private lines: List<string>;
  private desiredPrice: number;
  private foodEntries: Set<FoodEntry>;

  constructor(data: string) {
    this.data = data.trim();
    let errorString = "Invalid Data";
    if (!Parser.validateData(data)) throw errorString;
    try { // Defend against validateData function missing something.
      this.lines = this.getLines();
      this.desiredPrice = this.getDesiredPrice();
      this.foodEntries = this.getFoodEntries();
    } catch (err) {
      throw `${errorString}. ${err}`;
    }
  }

  getParserResults() {
    return { desiredPrice: this.desiredPrice, foodEntries: this.foodEntries };
  }

  static validateData(data) {
    try {
      return / *\$(\d+)?\.\d{2} *(( *\n)*(\w| )+, *\$(\d+)?\.\d+ *)+/.test(data);
    } catch (_) { // Data is definitely bad if validator doesn't run
      return false;
    }
  }

  private getLines(): List<string> {
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
