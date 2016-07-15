/// <reference path="../typings/index.d.ts"/>

import {App} from "./app";
const {Promise} = require("promise");
import fs = require("fs");
const {dialog} = require("electron").remote;

export class Browser {
  private app: App;
  private initial = `
<h1>Menu Budgeter</h1>
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
The desired budget should be listed with a dollar sign on the
first line; all subsequent lines should correspond to one food
item with the food item&rsquo;s name, followed by a comma,
followed by a dollar sign, followed by the item&rsquo;s price.
Do not insert spaces except within the food name.
</p>
<hr>
<button id="openFile" class="btn">Select File</button>
`;

  constructor() {
    document.getElementById("content").innerHTML = this.initial;
    document.getElementById("openFile").addEventListener("click", () => {
      let f = dialog.showOpenDialog({ properties: ["openFile"] });
      fs.readFile(f[0], "utf-8", (err, data) => {
        if (err) alert("Error reading file!");
        this.app = new App(data);
        console.log(this.app.getDesiredPrice());
      });
    });
  }
}

let b = new Browser();


// let openFile = () => {
//   let f = dialog.showOpenDialog({ properties: ["openFile"] });
//   let data = fs.readFileSync(f[0], "utf-8");
//   let app = new App(data);
//   console.log(app.getDesiredPrice());
// };
