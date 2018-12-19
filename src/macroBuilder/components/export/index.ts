import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as clipboard from "clipboard-polyfill/build/clipboard-polyfill.promise";
import { MacroGroupService } from "../..";
import { exportMacroItems } from "../../shared/parser";

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
