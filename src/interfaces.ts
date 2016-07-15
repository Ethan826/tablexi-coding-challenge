import {List} from "immutable";

export interface FoodEntry {
  food: string;
  price: number;
}

export interface ParserResults {
  desiredPrice: number;
  foodEntries: List<FoodEntry>;
}
