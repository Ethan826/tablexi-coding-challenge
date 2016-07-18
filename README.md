Table XI Coding Challenge
=========================

Usage
-----

Clone the repository to your machine. Install the dependencies with
`npm install` (and `typings install` if you intend to recompile or edit
the TypeScript files). Run the app with `npm start` You can package the
app with
[electron-packager](https://github.com/electron-userland/electron-packager).
To run the tests, run `jasmine`.

Description
-----------

### Knapsack algorithm

The core of the application is the function `compute` (and
`computeHelper`) in the `Knapsack` class. The function takes two
arguments: an Immutable.Set of numbers corresponding to menu prices and
a number corresponding to the budget / target price. It returns a
Immutable.List of Immutable.Sets of combinations that sum to the budget.

This could be refactored less cleanly to use ES6 tail call optimization,
but (1) TCO is not implemented in any of the polyfills, see
[here](https://kangax.github.io/compat-table/es6/), and (2) we run into
time issues before any stack overflows.

### Conceptual explanation

The algorithm employs the divide-and-conquer strategy. I used
[this](http://www.mathcs.emory.edu/~cheung/Courses/323/Syllabus/DynProg/knapsack2.html)
description as my jumping-off point.

In concept, the algorithm looks at the menu items one at a time. It
says, “let’s assume I buy this item. Now what kind of budget do I have
left and what can I buy with that?” Notice that this is the same kind of
question posed by the original problem: what menu items will fill out
what remains of our budget?

We keep recursively solving that problem until we have only one or zero
items left that we can afford (and by *item*, I really mean *price*). If
there is only one item left, we see if we can buy one or more of that
item and exactly use up what remains of our budget. If we cannot use up
all our money by buying some integer multiple of the only item left, or
if there are no items left that we can afford, we realize that we cannot
buy the item that made the recursive call. If we can buy some item that
exactly exhausts our budget, we pass that information back to our
recursive caller, which concatenates itself to the results and returns.

In preparing for the recursive call, we know that we cannot consider any
menu items that are *larger* than our current budget, so we can
eliminate those. Also, we want to avoid repeating the same calculations
and creating duplicate lists of menu items. We can do that by
recognizing that when we consider an item on the menu, our strategy for
recursion will assure that we have the opportunity to determine if
less-expensive items can still fit within the budget. Because of that,
it is not necessary to come at the same problem from the other side: we
do not need to look into which *more-expensive* items can still fit in
the budget when we are evaluating a *less-expensive* item. That means
that on the recursive call, we can filter out all items that have a
price higher than the menu item currently under consideration.

There is one special case in the recursive call: if the remaining budget
is exactly the same as the price of the menu item under consideration,
we short circuit the recursive call and return that menu item. That is
necessary because the recursive call would have a budget of zero and so
would fail to return any result.

### Example

Note that these examples are simplified by eliding the facts that we use
`Immutable.List` and that there are some quirks with nesting and
flattening lists of lists.

Consider the following example: the menu items are `[2, 3, 4]`, and the
budget is 6. The algorithm makes a recursive call on each of the
elements iff the list has at least two elements.

For the 4 element, the recursive call sets the new budget to 6 - 4 = 2.
It then filters the menu items to remove any item more than the new
budget (2) and any item more than the item currently under consideration
(4). So the new list of menu items for the recursive call is `[2]`. That
is one of the recursive base cases. The result of that recursion
is`[[2]]`. On receiving the result, the algorithm concatenates the 4 to
reach one final solution of `[[2, 4]]`.

For the 3 element, the recursive call sets the new budget to 6 - 3 = 3
and filters the menu items to `[2, 3]`. The algorithm recursively
evaluates `compute([], 1)` and `compute([3], 0)`. The first of those two
recursive calls encounters a base case (an empty list) and returns
`null` because there are no candidates. The second call actually never
gets made because when the new budget is exactly zero, we return the
menu item under consideration (for exactly this situation). So the final
result for the 3 element is `[[3, 3]]`.

For the 2 element the recursive call sets the new budget to 6 - 2 = 4
and filters the menu items to `[2]`. This is another base case (a
one-item list). The base case tests whether `4 % 2 === 0`. It does, so
it returns `Array(budget / onlyItem).fill(onlyItem)` where
`onlyItem = menuItems[0]`.

### Memoization

Even though I take steps before recursion to remove causes of
duplication, different branches of the recursion can encounter the same
arguments. I originally tried to use the `memoizee` library, but it
appears only to memoize final results based on the *initial* call to the
memoized function. I tested it with a recursive implementation of the
Fibonacci sequence, and while calling `fib(32)` a second time was much
faster, calling `fib(33)` before and after calling `fib(32)` did not
demonstrate a speedup. So `memoizee` did not capture the duplicated
effort in running `fib()` with a larger argument.

Immutable.Map would work well if it weren’t immutable—but I need to be
able to mutate the data structure holding the memoized data because it
has to sit outside the scope of the recursive function (there might be
some functional programming trick to that but I don’t know it).

So I decided to use the `object-hash` library and roll my own
memoization. I coerce the `prices` argument to an array and then hash
that, hash the budget number, then concatenate and hash those strings (I
could have converted both to strings, concatenated, and the hashed them,
but I was concerned there might be some detail of converting from a
JavaScript object to a string that might influence the result of
hashing.) The hash becomes the key in a JavaScript object called `memo`,
and the return value becomes the value.

The first step on calling the `computeHelper` function is to check the
`memo` variable. If that key is `undefined`, this is the first time the
function has been called with those arguments. Before each of the
`return` statements, the function first stashes that value in the `memo`
variable, at the key corresponding to the previously computed hash.

Design
------

I have tried to separate concerns in designing the app, but I have not
defined interfaces and abstract classes to formalize the abstractions.
That would be my first step if we wanted to incorporate additional
sources of UI, for example. See my project
[here](https://github.com/Ethan826/tic-tac-toe_coding_challenge) for how
I would approach that kind of implementation.

Once Electron cranks up, it calls `Browser`, which controls the view and
handles UI. Once `Browser` has valid data, it instantiates `App`. `App`
instantiates `Parser`, passing in the data `Browser` handed off
(`Browser` validated the data by calling the static `validateData`
method from `Parser`). `Parser`’s constructor manipulates the data and
stores it in `desiredPrice` (a `number`) and `priceMap`, an
`Immutable.Map` with prices as keys and an `Immutable.Set` of strings as
values, with each string containing the name of one food whose price
equals the key. For
example,`{215: ["pigeon remoulade", "mixed fruit"]}`. (Note that numbers
are stored internally as an integer representing pennies to avoid
problems with floats. I saw a
[video](http://www.tablexi.com/developers/money-in-ruby/) about this
somewhere.)

Now, `App` requests `desiredPrice` and `priceMap` from `Parser`. `App`
then instantiates a `Backpack` passing in an `Immutable.Set` of prices
and a `desiredPrice`. `Backpack`’s constructor calls `compute` (which
calls `computeHelper`) calculating results as an
`Immutable.Set<Immutable.List<number>>`. The inner collections each
contain one combination of prices that add up to the `desiredPrice`.
`App` calls `getResults` on its instance of `Backpack` to receive that
result.

`App` next instantiates `Formatter`, passing in `priceMap` and the
results from `Knapsack.compute`. `Formatter`’s constructor creates an
`Immutable.Set<Immutable.Set<string>>` of sentences in the form “7
orders of mixed fruit (at \\\$2.15 each).” `App` then requests that
result.

Finally, `Browser` calls `App`’s `getDesiredPrice` and `getResults`
methods and uses that data to populate the results page.

This design would permit a new UI provider to be subbed in, a different
algorithm to calculate the prices, and a different formatter to create
the output text.

Tests
-----

One area I’m still learning about is how to balance between testing and
preferring private data and methods. Here I have set most of the
implementation as private, and so my tests focus mostly on the class’s
APIs rather than implementation details. As a result, I was not positive
how to test-drive somewhat complicated internal details that I was
figuring out as I implemented them (although I got some relief from an
[article](https://medium.com/table-xi/development-driven-testing-673d3959dac2#.7xxo4lq6b)
I came across).

The tests of `App` are closer to functional tests because they involve
several classes working together.

One possible TODO is to use
[Spectron](https://github.com/electron/spectron) or something similar to
test the UI. I have manipulated the UI myself to test for bugs, but
automatic and regression testing could add some comfort.

Electron app
------------

Part of the assignment was this:

> We encourage you to think of this in a real world context, meaning
> that a client really wants to place this kind of order at a
> restaurant, (you can assume the client has a laptop with them at the
> restaurant and can run arbitrary command-line or web programs). In
> other words, we want you to solve the problem, not just the algorithm.
> How will the client run the program? How will the output be presented?

I decided to use Electron because it can be packaged into a
cross-platform executable with no requirement to spin up a server,
install a runtime environment, or use the command line. The tradeoff is
that the packaged app is absurdly large.

Functional programming techniques
---------------------------------

My most comfortable language is Clojure and lately I have been trying to
learn Scala. As a result, I have used a lot of functional programming
concepts alongside the object-oriented approach baked into TypeScript /
JavaScript. In fact, the code probably resembles idiomatic Scala more
than it does idiomatic TypeScript / JavaScript.

I have used the Immutable.js library, which provides persistent
immutable data structures. I chose to do so both because the languages I
have been working with encourage their users to avoid mutation (and the
bugs it can introduce), and also because using the `reduce` function
with a mutable collection requires a lot of copying to avoid mutating
the accumulator while manipulating it.

I chose to represent the data with Immutable.js primitives rather than
as an object. I did so because that simplifies using the many methods
Immutable.js exposes (in keeping with Perlis’s advice that “[i]t is
better to have 100 functions operate on one data structure than 10
functions on 10 data structures”).

Reactive programming
--------------------

I made use of RxJS because I was trying to avoid callback hell (and also
because I think it’s cool). The key event is waiting for the user to
click on the `Select File` button. That event listener triggers
launching the open file dialog window, which delivers the filename to a
callback. It is then necessary to validate the data in the file before
instantiating the `App` class with the data. If the data is invalid, it
is necessary to listen for another click and launch another dialog
window. Thus, we are already in this situation:

    $("#openFile").click(() => {
      dialog.showOpenDialog( { properties: ["openFile"] }, (filename) => {
        fs.readFile(filename[0], "utf-8", (data) => {
          if (Parser.validateData(data)) {
            // Do something
          } else {
            // Somehow go back to the beginning gracefully
          }
        });
      });
    });

Instead, we can pipeline a stream of clicks into a stream of validated
file data. By subscribing to that stream, we can do this:

    dataObservable.subscribe(
      (data) => { /* Instantiate app, display results */ },
      (err) => { /* Do something else */ }
    );

and deal with getting the dataObservable set up elsewhere.

I considered using Promises, but the app must be capable of listening
for a new click on the `Open File` button if the user closes the dialog
window or selects a file with invalid data. (That’s the same problem
posed by data validation happening within the click listener’s
callback.) It would also have been possible to have the button call a
function every time it is pushed, but I consider that to be less clean
from a separation-of-concerns perspective (because the html would know
about the file-opening and -validation logic).

Data format and validation
--------------------------

I handle invalid data and data that yields no results. I also strip
leading and trailing whitespace and blank lines. An additional TODO
might be handling more kinds of malformed data—prices without dollar
signs, punctuation within the food names, etc.

`Any` types
-----------

The TypeScript compiler gets confused by Immutable.js data structures in
some circumstances—particularly when reducing over a collection. Rather
than fighting the type checker, I have sometimes opted to omit type
annotations.
