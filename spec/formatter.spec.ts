/// <reference path="../typings/index.d.ts"/>

import {Formatter} from "../src/formatter";
import {Set, Map, List} from "immutable";

describe("formatter", () => {
  let priceMap = Map.of(
    215, Set(["mixed fruit"]),
    275, Set(["french fries"]),
    335, Set(["side salad"]),
    355, Set(["hot wings"]),
    420, Set(["mozzarella sticks"]),
    580, Set(["sampler plate"])
  );

  let priceCombinations = Set([
    List([215, 215, 215, 215, 215, 215, 215]),
    List([215, 355, 355, 580])
  ]);

  it("properly formats the supplied data", () => {
    let f = new Formatter(priceMap, priceCombinations);
    console.log(f.makeSentences());
  });
});
