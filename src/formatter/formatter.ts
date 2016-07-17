import {Map, Set, List, Seq} from "immutable";

export class Formatter {
  private priceCombinationsWithFreqs;
  private priceMapWithCombinedFoods;
  private sentences: Set<Set<string>>;

  constructor(
    private priceMap: any,
    private priceCombinations: any
  ) {

    // Consumes [[200 200] [100 100 100]], returns [{200: 2}, {100: 3}]
    this.priceCombinationsWithFreqs = this.priceCombinations
      .map(c => this.frequencies(c));

    // Map of prices as keys and a list of all food items at that price
    // joined by the word " or " e.g. { 200: "pickles or haggis gum" }
    this.priceMapWithCombinedFoods = this.combineSamePricedFoods();
    this.sentences = this.makeSentences();
  }

  getSentences() {
    return this.sentences;
  }

  private combineSamePricedFoods() {
    return this.priceMap
      .entrySeq() // Returns a list of [key, value] tuples for each Map entry

      // Reduce over Seq of [key, value] tuples, outputting the same keys but
      // converting the values from a Set of items ["food1", "food2"] to a
      // string joined with " or " to yield "food1 or food2"
      .reduce((accum: Map<number, string>, tuple: Seq<number, Set<string>>) => {
        return accum.set(tuple[0], tuple[1].join(" or "));
      },
      Map()); // Initialize accumulator as empty Map
  }

  private makeSentences(): Set<Set<string>> {
    // Return sets of sets of sentences of the form "1 order of newt tripe (at
    // $3.25 each)." Each outer set is one combination of orders.

    // priceCombinationsWithFreqs is in the form [{215: 7}, {215: 1, 355: 2, 580: 1}]
    return this.priceCombinationsWithFreqs
      .reduce((accum, el) => {

        /* We begin building each sentence by creating three lists: prices,
         * freqs (how many orders at that price), and foods (the names of all
         * foods at that price, joined by " or "). The values stored at each
         * index of the list correspond to one another, so freqs[0], foods[0]
         * and prices[0] combine to describe one full sentence (e.g. 7, mixed
         * fruit, 215).
         */

        let prices = el.keySeq(); // the keys are the prices
        let freqs = el.valueSeq(); // the values are the frequencies

        // priceMapWithCombinedFoods is of the form {215: "mixed fruit or
        // grubs", 355: "hot wings", 580: "sampler plate"}.
        let foods = prices
          .map(price => this.priceMapWithCombinedFoods.get(price));

        // Build the first part of the sentence by zipping the freqs list with
        // the foods list. zipWith interleaves two lists, combining the items
        // of the two lists as specified by the passed-in function.
        let partialSentence = freqs.zipWith((freq, food) => {
          return `${freq} order${freq > 1 ? "s" : ""} of ${food}`; // pluralize order(s) as needed
        }, foods);

        // Build the second part of the sentence by zipping the first half with
        // the price.
        let fullSentence = partialSentence.zipWith((partial, price) => {
          return `${partial} (at $${Formatter.formatCurrency(price)} each).`;
        }, prices).toSet();

        return accum.add(fullSentence); // Update the accumulator with the new sentence
      }, Set());
  }

  static formatCurrency(pennies) {
    return (pennies / 100).toFixed(2);
  }

  private frequencies(list) {
    // Given [215, 215, 215, 215, 580], return {215: 4, 580: 1}
    return list.reduce(
      (accum: Map<number, number>, el: number) => {
        return accum.has(el) // See if the number is a key in the accumulator
          ? accum.update(el, val => val + 1) // If yes, increment the value
          : accum.set(el, 1); // If not, add that key and set the value to one
      },
      Map({})
    );
  }
}
