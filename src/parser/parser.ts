import {List, Set, Map} from "immutable";

export interface ParserResults {
  desiredPrice: number;
  foodEntries: Map<number, Set<string>>;
}

export class Parser {
  private data: string;
  private lines: List<string>;
  private desiredPrice: number;
  private foodEntries: Map<number, Set<string>>;

  constructor(data: string) {
    this.data = data.trim();
    let errorString = "Invalid Data";

    if (!Parser.validateData(data)) throw errorString;

    try { // Defend against oversights in validateData function
      this.lines = this.getLines();
      this.desiredPrice = this.getDesiredPrice();
      this.foodEntries = this.getFoodEntries();
    } catch (err) {
      throw `${errorString}. ${err}`;
    }
  }

  getParserResults(): ParserResults {
    return { desiredPrice: this.desiredPrice, foodEntries: this.foodEntries };
  }

  static validateData(data): boolean {
    //                 Blank lines vvvvv |     Price vvvvvvvvvv|
    try { //   vvv First row vvv|        |vv food vv|          |vv Trailing blank
      return / *\$(\d+)?\.\d{2} *(( *\n)*(\w| )+, *\$(\d+)?\.\d+ *)+/.test(data);
    } catch (_) { // Data is definitely bad if validator doesn't run
      return false;
    }
  }

  private getLines(): List<string> {
    // Split the text into a List split on newlines, remove empty strings
    return List(this.data.split("\n").filter(s => s && s.length > 0));
  }

  private getDesiredPrice(): number {
    return this.integerifyCash(
      this.lines
        .get(0) // First line contains the desiredPrice
        .match(/(?:\$)(\S*)/)[1] // Match non-space characters after dollar sign
    );
  }

  private getFoodEntries(): Map<number, Set<string>> {
    // Reduce over the second through last line, converting the string into a
    // Map of {price: ["set", "of", "foods", "at", "that", "price"]}
    return this.lines
      .slice(1) // drop the first line, which contains desiredPrice
      .reduce(
      (accum, el: string): Map<number, Set<string>> => {

        // parseOneLine returns a single-entry Map. {price: ["food", "food"]}.
        let newEntry = this.parseOneLine(el);

        // mergeWith merges two maps. If there is a collision between keys, it
        // calls the passed-in function, and sets the value at that key
        // as the value returned from the lambda. Here, if the keys collide, we
        // know we must concat the food name to the list of food names already
        // at that price.
        return accum.mergeWith((oldVal, newVal) => {
          return oldVal.concat(newVal);
        }, newEntry);
      }, Map()) as Map<number, Set<string>>;
  }

  private parseOneLine(line: string): Map<number, string> {
    //                 food name vvvvv|comma|v$v|vvvvv price
    let match = line.match(/((?:\w| )+)(?:,)(?:\$)(.*)/);
    return Map.of(this.integerifyCash(match[2]), Set([match[1].trim()]));
  }

  private integerifyCash(num: string): number {
    let asFloat = parseFloat(num) * 100;
    return parseInt(asFloat.toString());
  }
}
