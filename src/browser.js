"use strict";
var app_1 = require("./app");
var Promise = require("promise").Promise;
var fs = require("fs");
var dialog = require("electron").remote.dialog;
var Browser = (function () {
    function Browser() {
        var _this = this;
        this.initial = "\n<h1>Menu Budgeter</h1>\n<p>This app will calculate all of the menu orders available for a particular budget.</p>\n<h3>Data Format</h3>\n<p>\nThe data must adhere precisely to this format:\n<table>\n<tr><td><code>$15.05</code></td></tr>\n<tr><td><code>mixed fruit,$2.15</code></td></tr>\n<tr><td><code>french fries,$2.75</code></td></tr>\n<tr><td><code>side salad,$3.35</code></td></tr>\n<tr><td><code>hot wings,$3.55</code></td></tr>\n<tr><td><code>mozzarella sticks,$4.20</code></td></tr>\n<tr><td><code>sampler plate,$5.80</code></td></tr>\n</table>\n</p>\n<p>\nThe desired budget should be listed with a dollar sign on the\nfirst line; all subsequent lines should correspond to one food\nitem with the food item&rsquo;s name, followed by a comma,\nfollowed by a dollar sign, followed by the item&rsquo;s price.\nDo not insert spaces except within the food name.\n</p>\n<hr>\n<button id=\"openFile\" class=\"btn\">Select File</button>\n";
        document.getElementById("content").innerHTML = this.initial;
        document.getElementById("openFile").addEventListener("click", function () {
            var f = dialog.showOpenDialog({ properties: ["openFile"] });
            fs.readFile(f[0], "utf-8", function (err, data) {
                if (err)
                    alert("Error reading file!");
                _this.app = new app_1.App(data);
                console.log(_this.app.getDesiredPrice());
            });
        });
    }
    return Browser;
}());
exports.Browser = Browser;
var b = new Browser();
