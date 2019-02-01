import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import * as FileSaver from "file-saver/FileSaver";
import * as JSZip from "jszip";
import { MacroGroupService } from "../..";
import { MacroConfigService } from "../../services/macroConfigService";
import { buildMacro } from "../../shared/build";

@Component({
  styleUrls: ["./index.css"],
  templateUrl: "./index.html",
})
export class GeneratorPackageComponent {

  public formControl: FormControl = new FormControl(null, Validators.required);

  constructor(
    public activeModal: NgbActiveModal,
    private macroGroupService: MacroGroupService,
    private macroConfigService: MacroConfigService) {
  }

  public generatePackage() {
    const groups = this.macroGroupService.getValue();
    const config = this.macroConfigService.getValue();
    const scriptName = this.formControl.value;

    const now: Date = new Date();
    const scriptFilename = `${now.getFullYear()}${now.getMonth()}${now.getDay()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
    const scriptContent = buildMacro(groups, config);
    const exportContent = `[${scriptFilename}]\r\nname=${scriptName}\r\nreplayTime=0\r\nreplayCycles=1\r\nreplayAccelRates=1\r\nreplayInterval=0\r\ncycleInfinite=false\r\nbNew=false\r\n`;
    const zip = new JSZip();

    zip.file(scriptFilename + ".mir", scriptContent);
    zip.file("export", exportContent);
    zip.generateAsync({ type: "blob" }).then((content) => {
      FileSaver.saveAs(content, `${scriptName}.scp`);
    });
  }
}
