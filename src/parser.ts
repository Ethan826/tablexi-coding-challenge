import {List} from "immutable";

export interface FoodEntry {
  food: string;
  price: Number;
}

export class Parser {
  private desiredPrice: Number;
  private foodEntries: List<FoodEntry>;

  constructor(private data: String) {
    let lineArray = data.split("\n");
    this.desiredPrice = this.parseOneLine(lineArray[0]).price;
    this.foodEntries = lineArray
      .slice(1)
      .reduce((accum: List<FoodEntry>, el: String): List<FoodEntry> => {
        return accum.push(this.parseOneLine(el));
      }, List()) as List<FoodEntry>;
  }

  private parseOneLine(line: String): FoodEntry {
    let match = line.match(/(.*?)(?:,)?(?:\$)(.*)/);
    return { food: match[1].trim(), price: parseFloat(match[2]) };
  }

  getDesiredPrice(): Number {
    return this.desiredPrice;
  }

  getFoods(): List<String> {
    return this.foodEntries
      .map(e => e.food)
      .toList();
  }
}
