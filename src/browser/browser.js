"use strict";
var app_1 = require("../app/app");
var parser_1 = require("../parser/parser");
var formatter_1 = require("../formatter/formatter");
var templates_1 = require("../templates/templates");
var fs = require("fs");
var dialog = require("electron").remote.dialog;
var Rx = require("rx-lite");
var $ = require("jquery");
var Browser = (function () {
    function Browser() {
        var _this = this;
        this.initialPage = templates_1.initialPage;
        this.resultsPage = templates_1.resultsPage;
        this.setPage(templates_1.initialPage);
        this.getDataObservable().subscribe(function (data) {
            var app = new app_1.App(data);
            _this.setPage(templates_1.resultsPage);
            _this.populateResultsPage(app.getDesiredPrice(), app.getResults());
        }, function (err) { alert("There has been an error."); });
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
            .flatMap(function (d) {
            if (parser_1.Parser.validateData(d)) {
                return Rx.Observable.just(d);
            }
            else {
                alert("Invalid data.");
            }
        });
    };
    Browser.prototype.setPage = function (page) {
        $("#content").empty();
        $("#content").append(page);
    };
    Browser.prototype.populateResultsPage = function (desiredPrice, results) {
        $("#budget").append("" + formatter_1.Formatter.formatCurrency(desiredPrice));
        if (results.isEmpty()) {
            $("#preamble").append("\n        <div class=\"alert alert-danger\" id=\"noresults\">\n          There is no combination of foods that satisfy your budget.\n        </div>\n      ");
        }
        else {
            results.forEach(function (combo) {
                $("#results").append("<li class=\"list-group-item\"><ul class=\"entry\"></ul></li>");
                combo.forEach(function (sentence) {
                    $(".entry").last().append("<li class=\"list-unstyled food\">" + sentence + "</li>");
                });
            });
        }
    };
    return Browser;
}());
exports.Browser = Browser;
