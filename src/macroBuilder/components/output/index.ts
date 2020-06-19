import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as clipboard from "clipboard-polyfill/build/clipboard-polyfill.promise";
import { merge } from "rxjs";
import { ALL_ACTIONS, GeneratorPackageComponent, IMacroAction, MacroConfigService } from "../..";
import { Component, OnInit } from "@angular/core";
import { Macro } from "../../../memuMacro";
import { MacroGroupService } from "../../services/macroGroupService";
import { buildMacro } from "../../shared/build";

@Component({
  selector: "script-output",
  styleUrls: ["./index.css"],
  templateUrl: "./index.html",
})
export class OutputComponent implements OnInit {

  public macroScript: string;

  constructor(private modalService: NgbModal, private macroGroupService: MacroGroupService, private macroConfigService: MacroConfigService) {  }

  private buildScript = () => {
    const groups = this.macroGroupService.getValue();
    const config = this.macroConfigService.getValue();
    this.macroScript = buildMacro(groups, config);
  }

  public ngOnInit() {
    merge(this.macroConfigService.observable, this.macroGroupService.observable).subscribe(() => {
      this.buildScript();
    });
  }

  public generateImportPackage = () => {
    this.modalService.open(GeneratorPackageComponent, {
      backdrop: "static",
      centered: true,
      keyboard: false,
    });
  }

  public copyResultToClipboard = () => {
    clipboard.writeText(this.macroScript);
  }
}
