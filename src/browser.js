"use strict";
var fs = require("fs");
var dialog = require("electron").remote.dialog;
var Promise = require("es6-promise").Promise;
var Rx = require("rx-lite");
var app_1 = require("./app");
var templates_1 = require("./templates");
var Browser = (function () {
    function Browser() {
        this.initialPage = templates_1.initialPage;
        this.setInitialPage();
        this.clickListener = this.setClickListener();
        this.fileData = this.getFileData();
        this.app = this.fileData.map(function (data) { return new app_1.App(data); });
        this.app.subscribe(function (app) { return console.log(app.getDesiredPrice()); });
    }
    Browser.prototype.setInitialPage = function () {
        document.getElementById("content").innerHTML = this.initialPage;
    };
    Browser.prototype.setClickListener = function () {
        var button = document.getElementById("openFile");
        return Rx.Observable.fromEvent(button, "click");
    };
    Browser.prototype.getFileData = function () {
        return this.clickListener.flatMap(function () {
            var f = dialog.showOpenDialog({ properties: ["openFile"] });
            var read = Rx.Observable.fromCallback(fs.readFile);
            return read(f[0], "utf-8").map(function (result) { return result[1]; });
        });
    };
    return Browser;
}());
exports.Browser = Browser;
var b = new Browser();
