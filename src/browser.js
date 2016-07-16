"use strict";
var app_1 = require("./app");
var parser_1 = require("./parser");
var templates_1 = require("./templates");
var fs = require("fs");
var dialog = require("electron").remote.dialog;
var Rx = require("rx-lite");
var Browser = (function () {
    function Browser() {
        this.initialPage = templates_1.initialPage;
        this.resultsPage = templates_1.resultsPage;
        this.setInitialPage();
        this.getDataObservable().subscribe(function (data) {
            alert((new app_1.App(data)).getDesiredPrice());
        }, function (err) { alert("Aww fuck!"); });
    }
    Browser.prototype.getDataObservable = function () {
        var button = document.getElementById("openFile");
        var click = Rx.Observable.fromEvent(button, "click");
        var opener = Rx.Observable.fromCallback(dialog.showOpenDialog);
        var reader = Rx.Observable.fromCallback(fs.readFile);
        return click
            .flatMap(function () {
            return opener({ properties: ["openFile"] });
        })
            .filter(function (f) { return f; })
            .flatMap(function (f) { return reader(f[0], "utf-8"); })
            .map(function (d) { return d[1]; })
            .do(function (d) { if (!parser_1.Parser.validateData(d))
            alert("Invalid data."); })
            .filter(function (d) { return parser_1.Parser.validateData(d); });
    };
    Browser.prototype.setInitialPage = function () {
        document.getElementById("content").innerHTML = this.initialPage;
    };
    Browser.prototype.displayResults = function (app) {
        document.getElementById("content").innerHTML = this.resultsPage;
    };
    return Browser;
}());
exports.Browser = Browser;
