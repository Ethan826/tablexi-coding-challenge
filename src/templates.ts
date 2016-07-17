export const initialPage = `
<p>This app will calculate all of the menu orders available for a particular budget.</p>
<h3>Data Format</h3>
<p>
The data must adhere precisely to this format:
<table>
<tr><td><code>$15.05</code></td></tr>
<tr><td><code>mixed fruit,$2.15</code></td></tr>
<tr><td><code>french fries,$2.75</code></td></tr>
<tr><td><code>side salad,$3.35</code></td></tr>
<tr><td><code>hot wings,$3.55</code></td></tr>
<tr><td><code>mozzarella sticks,$4.20</code></td></tr>
<tr><td><code>sampler plate,$5.80</code></td></tr>
</table>
</p>
<p>
The desired budget should be listed  on the first line; all subsequent lines
should correspond to one food item with the food item&rsquo;s name, followed by
a comma, followed by the item&rsquo;s price. Prices must be of the form
<code>$n.nn</code> (with at least one number before the period).  Food names 
must contain only letters and spaces.
</p>
<hr>
<button id="openFile" class="btn">Select File</button>`;

export const resultsPage = `
<h3>Results</h3>
<h4 id="preamble">Given your budget of $<span id="budget"></span>&hellip;</h4>
<ul id="results" class="list-group"></ul>
`;
