import {Map, Set, List, Seq} from "immutable";

// Used "any" type annotations because the type checker is completely
// bananas with all the map and reduce calls to Immutable.js collections

export class Formatter {
  private priceCombinationsWithFreqs: any;
  private priceMapWithCombinedFoods: any;

  constructor(
    private priceMap: any,
    private priceCombinations: any
  ) {
    this.priceCombinationsWithFreqs = this.priceCombinations
      .map((c: any) => this.frequencies(c));
    this.priceMapWithCombinedFoods = this.combineSamePricedFoods();
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

  makeSentences(): Set<Set<string>> {
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
            return `${partial} (at $${Formatter.formatCurrency(price)} each).`;
          },
          prices
        ).toSet();
        return accum.add(fullSentence);
      }, Set());
  }

  static formatCurrency(pennies) {
    return (pennies / 100).toFixed(2);
  }

  private frequencies(list: any): any {
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
