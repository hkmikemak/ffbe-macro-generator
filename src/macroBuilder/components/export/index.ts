import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IMacroGroup } from "../../interfaces/macroGroup";
import { exportMacroItems } from "../../shared/parser";
const clipboard = require("clipboard-polyfill");

@Component({
  styleUrls: ["./index.css"],
  templateUrl: "./index.html",
})
export class ExportComponent {
  public output: string = "";

  constructor(public activeModal: NgbActiveModal) { }

  public setOutput(source: IMacroGroup[]): void {
    this.output = exportMacroItems(source);
  }

  public copyOutputToClipboard() {
    clipboard.writeText(this.output);
  }
}
