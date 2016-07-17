import {List, Set, Map} from "immutable";
import {FoodEntry, ParserResults} from "../interfaces/interfaces";

export class Parser {
  private data: string;
  private lines: List<string>;
  private desiredPrice: number;
  private foodEntries: Map<number, Set<string>>;

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
    return this.integerifyCash(this.lines.get(0).match(/(?:\$)(.*)/)[1]);
  }

  private getFoodEntries(): Map<number, Set<string>> {
    return this.lines
      .slice(1) // the first line is the desired price
      .reduce(
      (accum: Map<number, Set<string>>, el: string): Map<number, Set<string>> => {
        let newEntry = this.parseOneLine(el);
        return accum.mergeWith((oldVal, newVal) => {
          return oldVal.concat(newVal);
        }, newEntry);
      }, Map());
  }

  private parseOneLine(line: string): Map<number, string> {
    let match = line.match(/(.*?)(?:,)?(?:\$)(.*)/);
    return Map.of(this.integerifyCash(match[2]), Set([match[1].trim()]));
  }

  private integerifyCash(num: string): number {
    let asFloat = parseFloat(num) * 100;
    return parseInt(asFloat.toString());
  }
}
