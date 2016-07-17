/// <reference path="../../typings/index.d.ts"/>

import {App} from "../app/app";
import {Parser} from "../parser/parser";
import {Formatter} from "../formatter/formatter";
import {initialPage, resultsPage} from "../templates/templates";

import {Set} from "immutable";
import fs = require("fs");
const {dialog} = require("electron").remote;
const Rx = require("rx-lite");
import * as $ from "jquery";

export class Browser {
  // Page templates
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

    // Returns an observable that will emit the file contents the user selects
    // iff the data is valid
    this.getDataObservable().subscribe(
      (data) => {
        let app = new App(data);
        this.setPage(resultsPage);
        this.populateResultsPage(app.getDesiredPrice(), app.getResults());
      },
      (err) => { alert("There has been an error."); }
    );
  }

  private getDataObservable() {
    let button = document.getElementById("openFile");

    let click = Rx.Observable.fromEvent(button, "click");
    let opener = Rx.Observable.fromCallback(dialog.showOpenDialog);
    let reader = Rx.Observable.fromCallback(fs.readFile);

    // Pipeline of observables to convert a stream of clicks into a stream of
    // file data
    return click
      .flatMap(() => { // stream of clicks
        return opener({ properties: ["openFile"] }); // returns the selected filename (as one-item array)
      })
      .filter(f => f) // Don't emit event if user didn't select a file
      .flatMap(f => reader(f[0], "utf-8")) // map filename stream to file data stream
      .map(d => d[1]) // Hack: Observable-wrapped readFile returns [null, fileData]
      .do(d => { if (!Parser.validateData(d)) alert("Invalid data."); })
      .filter(d => Parser.validateData(d));
  }

  private setPage(page: string) {
    $("#content").empty();
    $("#content").append(page);
  }

  private populateResultsPage(desiredPrice: number, results: Set<Set<string>>) {
    // Put the extracted budget on the page
    $("#budget").append(`${Formatter.formatCurrency(desiredPrice)}`);

    // Empty results
    if (results.isEmpty()) {
      $("#preamble").append(`
        <div class="alert alert-danger" id="noresults">
          There is no combination of foods that satisfy your budget.
        </div>
      `);
      // Else loop over results to populate list
    } else {

      // Each combo of results
      results.forEach((combo) => {
        $("#results").append(`<li class="list-group-item"><ul class="entry"></ul></li>`);

        // Each food item within combo of results
        combo.forEach((sentence) => {
          $(".entry").last().append(`<li class="list-unstyled food">${sentence}</li>`);
        });
      });
    }

  }

}
