/// <reference path="../../typings/index.d.ts"/>

import {Formatter} from "../../src/formatter/formatter";
import {Set, Map, List} from "immutable";

describe("formatter", () => {
  let priceMap = Map.of(
    215, Set(["mixed fruit", "bubble yum"]),
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
  let expectedResult = Set([
    Set(["7 orders of mixed fruit or bubble yum (at $2.15 each)."]),
    Set([
      "1 order of mixed fruit or bubble yum (at $2.15 each).",
      "1 order of mixed fruit or bubble yum (at $2.15 each).",
      "2 orders of hot wings (at $3.55 each).",
      "1 order of sampler plate (at $5.80 each)."
    ])
  ]);

  it("properly formats the supplied data", () => {
    let f = new Formatter(priceMap, priceCombinations);
    expect(f.makeSentences().equals(expectedResult)).toBe(true);
    expect(f.makeSentences().equals(Set([Set(["foo"])]))).toBe(false);
  });
});
