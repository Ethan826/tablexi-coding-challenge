import {List} from "immutable";

export interface FoodEntry {
  food: string;
  price: number;
}

export class Parser {
  private desiredPrice: number;
  private foodEntries: List<FoodEntry>;

  constructor(private data: string) {
    let lineArray = data.split("\n");
    this.desiredPrice = this.parseOneLine(lineArray[0]).price;
    this.foodEntries = lineArray
      .slice(1)
      .reduce((accum: List<FoodEntry>, el: string): List<FoodEntry> => {
        return accum.push(this.parseOneLine(el));
      }, List()) as List<FoodEntry>;
  }

  getDesiredPrice(): number {
    return this.desiredPrice / 100.0;
  }

  getFoodEntries(): List<FoodEntry> {
    return this.foodEntries;
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
