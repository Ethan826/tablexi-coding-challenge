/// <reference path="../typings/index.d.ts"/>

import fs = require("fs");
const {dialog} = require("electron").remote;
const Promise = require("es6-promise").Promise;
const Rx = require("rx-lite");

import {App} from "./app";
import {initialPage} from "./templates";

export class Browser {
  private initialPage: string;
  private resultsPage: string;
  private clickListener: Rx.Observable<any>;
  private fileData: Rx.Observable<string>;
  private app: Rx.Observable<App>;

  constructor() {
    this.initialPage = initialPage;
    this.setInitialPage();
    this.clickListener = this.setClickListener();
    this.fileData = this.getFileData();
    this.app = this.fileData.map(data => new App(data));
    this.app.subscribe(app => console.log(app.getDesiredPrice()));
    // this.instantiateApp().subscribe(app => {
    //   console.log(app);
    // });
    // this.app = this.instantiateApp().subscribe();
    // this.fileData.then(() => console.log("Foo"));
    // this.fileData = this.getFileData();
    // this.app = this.fileData.then(data => this.instantiateApp());
  }

  private setInitialPage() {
    document.getElementById("content").innerHTML = this.initialPage;
  }

  private setClickListener() {
    let button = document.getElementById("openFile");
    return Rx.Observable.fromEvent(button, "click");
  }

  private getFileData(): Rx.Observable<string> {
    return this.clickListener.flatMap(() => {
      let f = dialog.showOpenDialog({ properties: ["openFile"] });
      let read = Rx.Observable.fromCallback(fs.readFile);
      return read(f[0], "utf-8").map(result => result[1]);
    });
  }

  // private instantiateApp(): Rx.Observable<App> {
  //   return this.fileData.map(data => {
  //     return new App(data);
  //   });
  // }
}

let b = new Browser();
