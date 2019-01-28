import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as clipboard from "clipboard-polyfill/build/clipboard-polyfill.promise";
import { MacroConfigService, MacroGroupService } from "../..";
import { exportMacroItems } from "../../shared/parser";

@Component({
  styleUrls: ["./index.css"],
  templateUrl: "./index.html",
})
export class ExportComponent {
  public output: string = "";

  constructor(public activeModal: NgbActiveModal, private macroGroupService: MacroGroupService, private macroConfigService: MacroConfigService) {
    this.output = exportMacroItems(this.macroGroupService, this.macroConfigService);
  }

  public copyOutputToClipboard() {
    clipboard.writeText(this.output);
  }
}
