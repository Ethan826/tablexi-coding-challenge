"use strict";
var fs = require("fs");
var dialog = require("electron").remote.dialog;
var Promise = require("es6-promise").Promise;
var Rx = require("rx-lite");
var app_1 = require("./app");
var templates_1 = require("./templates");
var Browser = (function () {
    function Browser() {
        var _this = this;
        this.initialPage = templates_1.initialPage;
        this.resultsPage = templates_1.resultsPage;
        this.setInitialPage();
        this.clickListenerObserver = this.setClickListenerObserver();
        this.fileDataObserver = this.getFileDataObserver();
        this.appObserver = this.getAppObserver();
        this.appObserver.subscribe(function (app) { return _this.displayResults(app); }, function (err) { alert("There has been an error"); });
    }
    Browser.prototype.setInitialPage = function () {
        document.getElementById("content").innerHTML = this.initialPage;
    };
    Browser.prototype.displayResults = function (app) {
        document.getElementById("content").innerHTML = this.resultsPage;
    };
    Browser.prototype.setClickListenerObserver = function () {
        var button = document.getElementById("openFile");
        return Rx.Observable.fromEvent(button, "click");
    };
    Browser.prototype.getFileDataObserver = function () {
        return this.clickListenerObserver.flatMap(function () {
            var f = dialog.showOpenDialog({ properties: ["openFile"] });
            var read = Rx.Observable.fromCallback(fs.readFile);
            return read(f[0], "utf-8")
                .map(function (result) { return result[1]; });
        });
    };
    Browser.prototype.getAppObserver = function () {
        return this.fileDataObserver.map(function (data) { return new app_1.App(data); });
    };
    return Browser;
}());
exports.Browser = Browser;
var b = new Browser();
