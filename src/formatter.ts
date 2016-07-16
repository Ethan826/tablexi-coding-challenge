import {Map, Set, List, Seq} from "immutable";

export class Formatter {
  private priceCombinationsWithFreqs: Set<Map<number, number>>;
  private priceMapWithCombinedFoods: Map<number, string>;

  constructor(
    private priceMap: Map<number, Set<string>>,
    private priceCombinations: Set<List<number>>
  ) {
    this.priceCombinationsWithFreqs = this.priceMapWithCombinedFoods = this.combineSamePricedFoods();
  }

  private getPriceCombinationsWithFreqs(): any {
    return this.priceCombinations.map((c: Set<List<number>>) => {
      this.frequencies(c);
    });
  }

  private combineSamePricedFoods() {
    let alternatives = this.priceMap
      .entrySeq()
      .reduce((accum: Map<number, string>, tuple: Seq<number, Set<string>>) => {
        return accum.set(tuple[0], tuple[1].join(" or "));
      },
      Map());
    return alternatives;
  }

  makeSentences() {
    return this.priceCombinationsWithFreqs
      .reduce((accum: Set<Set<string>>, el: Map<number, Map<number, number>>) => {
        let prices = el.keySeq();
        let freqs = el.valueSeq();
        let foods = prices.map(price => this.priceMapWithCombinedFoods.get(price));
        let partialSentence = freqs.zipWith(
          (freq, food) => { return `${freq} order(s) of ${food}`; },
          foods
        );
        let fullSentence = partialSentence.zipWith(
          (partial, price) => {
            return `${partial} (at $${(price / 100).toFixed(2)} each.)`;
          },
          prices
        ).toSet();
        return accum.add(fullSentence);
      }, Set());
  }

  private frequencies(list: Set<List<number>>): Map<number, number> {
    return list.reduce(
      (accum: Map<number, number>, el: number) => {
        return accum.has(el)
          ? accum.update(el, val => val + 1)
          : accum.set(el, 1);
      },
      Map({})
    );
  }
}
