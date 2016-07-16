/// <reference path="../typings/index.d.ts"/>

import {App} from "./app";
import {Parser} from "./parser";
import {initialPage, resultsPage} from "./templates";

import fs = require("fs");
const {dialog} = require("electron").remote;
const Rx = require("rx-lite");
import * as $ from "jquery";

export class Browser {
  private initialPage: string;
  private resultsPage: string;
  private clickListenerObserver: Rx.Observable<any>;
  private fileSelectionObserver: Rx.Observable<Array<string>>;
  private fileDataObserver: Rx.Observable<string>;
  private appObserver: Rx.Observable<App>;

  constructor() {
    this.initialPage = initialPage;
    this.resultsPage = resultsPage;
    this.setPage(initialPage);
    this.getDataObservable().subscribe(
      (data) => {
        let app = new App(data);
        this.setPage(resultsPage);
        let element = document.getElementById("results");
        let results = app.getResults();
        results.forEach((combo) => {
          $("#results").append("<li class='list-group-item'><ul class='entry'></ul></li>");
          combo.forEach((sentence) => {
            $(".entry").last().append(`<li>${sentence}</li>`);
          });
        });
      },
      (err) => { alert("There has been an error."); }
    );
  }

  private getDataObservable() {
    let button = document.getElementById("openFile");
    let click = Rx.Observable.fromEvent(button, "click");
    let opener = Rx.Observable.fromCallback(dialog.showOpenDialog);
    let reader = Rx.Observable.fromCallback(fs.readFile);

    return click
      .flatMap(() => {
        return opener({ properties: ["openFile"] });
      })
      .filter(f => f) // Don't emit event if user doesn't select a file
      .flatMap(f => reader(f[0], "utf-8"))
      .map(d => d[1])
      .do(d => { if (!Parser.validateData(d)) alert("Invalid data."); })
      .filter(d => Parser.validateData(d));
  }

  private setPage(page: string) {
    $("#content").empty();
    $("#content").append(page);
  }

  private displayResults(app: App) {
    document.getElementById("content").innerHTML = this.resultsPage;
  }
}
