/// <reference path="../typings/index.d.ts"/>

import fs = require("fs");
const {dialog} = require("electron").remote;
const Promise = require("es6-promise").Promise;
const Rx = require("rx-lite");

import {App} from "./app";
import {initialPage, resultsPage} from "./templates";

export class Browser {
  private initialPage: string;
  private resultsPage: string;
  private clickListenerObserver: Rx.Observable<any>;
  private fileDataObserver: Rx.Observable<string>;
  private appObserver: Rx.Observable<App>;

  constructor() {
    this.initialPage = initialPage;
    this.resultsPage = resultsPage;
    this.setInitialPage();
    this.clickListenerObserver = this.setClickListenerObserver();
    this.fileDataObserver = this.getFileDataObserver();
    this.appObserver = this.getAppObserver();
    this.appObserver.subscribe(
      (app) => this.displayResults(app),
      (err) => { alert("There has been an error"); }
    );
  }

  private setInitialPage() {
    document.getElementById("content").innerHTML = this.initialPage;
  }

  private displayResults(app: App) {
     document.getElementById("content").innerHTML = this.resultsPage;
  }

  private setClickListenerObserver(): Rx.Observable<EventListener> {
    let button = document.getElementById("openFile");
    return Rx.Observable.fromEvent(button, "click");
  }

  private getFileDataObserver(): Rx.Observable<string> {
    return this.clickListenerObserver.flatMap(() => {
      let f = dialog.showOpenDialog({ properties: ["openFile"] });
      let read = Rx.Observable.fromCallback(fs.readFile);
      return read(f[0], "utf-8")
        .map((result: string[]) => result[1]);
    }) as Rx.Observable<string>;
  }

  private getAppObserver(): Rx.Observable<App> {
    return this.fileDataObserver.map(data => new App(data));
  }

  // private instantiateApp(): Rx.Observable<App> {
  //   return this.fileDataObserver.map(data => {
  //     return new App(data);
  //   });
  // }
}

let b = new Browser();
