import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MacroGroupService } from "../..";
import { exportMacroItems } from "../../shared/parser";
const clipboard = require("clipboard-polyfill");

@Component({
  styleUrls: ["./index.css"],
  templateUrl: "./index.html",
})
export class ExportComponent {
  public output: string = "";

  constructor(public activeModal: NgbActiveModal, private macroGroupService: MacroGroupService) {
    this.output = exportMacroItems(this.macroGroupService.getValue());
  }

  public copyOutputToClipboard() {
    clipboard.writeText(this.output);
  }
}
