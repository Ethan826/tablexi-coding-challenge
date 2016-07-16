"use strict";
var fs = require("fs");
var dialog = require("electron").remote.dialog;
var Promise = require("es6-promise").Promise;
var Rx = require("rx-lite");
var templates_1 = require("./templates");
var Browser = (function () {
    function Browser() {
        this.initialPage = templates_1.initialPage;
        this.setInitialPage();
        this.clickListener = this.setClickListener();
        this.fileData = this.getFileData();
        this.fileData.subscribe(function (x) { return console.log(x); });
    }
    Browser.prototype.setInitialPage = function () {
        document.getElementById("content").innerHTML = this.initialPage;
    };
    Browser.prototype.setClickListener = function () {
        var button = document.getElementById("openFile");
        return Rx.Observable.fromEvent(button, "click");
    };
    Browser.prototype.getFileData = function () {
        return this.clickListener.map(function () {
            var f = dialog.showOpenDialog({ properties: ["openFile"] });
            var read = Rx.Observable.fromCallback(fs.readFile);
            return read(f[0], "utf-8");
        });
    };
    return Browser;
}());
exports.Browser = Browser;
var b = new Browser();
