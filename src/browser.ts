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
  private clickListener: Rx.Observable<EventListener>;
  private fileData: Rx.Observable<string>;
  private app: Promise<App>;

  constructor() {
    this.initialPage = initialPage;
    this.setInitialPage();
    this.clickListener = this.setClickListener();
    this.fileData = this.getFileData();
    this.fileData.subscribe(x => console.log(x));
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
    return this.clickListener.map(() => {
      let f = dialog.showOpenDialog({ properties: ["openFile"] });
      let read = Rx.Observable.fromCallback(fs.readFile);
      return read(f[0], "utf-8");
    });
  }

  // private instantiateApp(): Promise<App> {
  //   return new Promise((res: Function, rej: Function) => {
  //     fs.readFile(f[0], "utf-8", (readErr, data) => {
  //       if (readErr) rej(readErr);
  //       if (!data) rej(new Error(`Error reading ${f[0]}`));
  //       try {
  //         res(new App(data));
  //       } catch (appErr) {
  //         rej(appErr);
  //       }
  //     });
  //   });
  // }
}

let b = new Browser();
