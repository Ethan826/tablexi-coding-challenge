/// <reference path="../typings/index.d.ts"/>

import {App} from "./app";
import {Parser} from "./parser";
import {initialPage, resultsPage} from "./templates";

import fs = require("fs");
const {dialog} = require("electron").remote;
const Rx = require("rx-lite");

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
    this.setInitialPage();
    this.getDataObservable().subscribe(
      (data) => {
        alert((new App(data)).getDesiredPrice());
      },
      (err) => { alert("Aww fuck!"); }
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

  private setInitialPage() {
    document.getElementById("content").innerHTML = this.initialPage;
  }

  private displayResults(app: App) {
    document.getElementById("content").innerHTML = this.resultsPage;
  }
}
