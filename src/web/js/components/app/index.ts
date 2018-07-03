import { Component, ElementRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IMacroGroup, IMacroAction } from "../../../../macroBuilder";
import { ExportComponent } from "../../../../macroBuilder/components/export";
import { ALL_ACTIONS } from "../../../../macroBuilder";
import { NewMacroGroupDialogComponent } from "../../../../macroBuilder/components/newMacroGroupDialog";
import { Macro } from "../../../../memuMacro";
const clipboard = require('clipboard-polyfill');

@Component({
  selector: "app-root",
  styleUrls: ["./index.css"],
  templateUrl: "./index.html",
})
export class AppComponent {

  public macroGroups: IMacroGroup[] = [];
  @ViewChild("textarea_result") public textarea: ElementRef;
  public macroScript: string = '';

  constructor(private modalService: NgbModal) {
    this.buildScript();
  }

  public removeGroup = (index: number) => {
    this.macroGroups.splice(index, 1);
    this.buildScript();
  }

  public insertGroups = (index: number, groups: IMacroGroup[], isPrepend: boolean) => {
    if(isPrepend)
      this.macroGroups.splice(index, 0, ...groups);
    else {
      if(this.macroGroups.length -1 === index) {
        this.macroGroups.push(...groups);
      } else {
        this.macroGroups.splice(index + 1, 0, ...groups);
      }
    }

    this.buildScript();
  }

  public updateRepeat = (index: number, newValue: number) => {
    if (this.macroGroups[index].repeat !== newValue) {
      this.macroGroups[index].repeat = newValue;
      this.buildScript();
    }
  };

  public updateGroupName = (index : number, newValue: string) => {
    if(this.macroGroups[index].name !== newValue) {
      this.macroGroups[index].name = newValue;
    }
  }


  public addGroup(isPrepend: boolean) {
    const modal = this.modalService.open(NewMacroGroupDialogComponent, {
      backdrop: "static",
      centered: true,
      keyboard: false,
    });
    modal.result
      .then((result) => {
        if (result) {
          this.macroGroups.push(...result);
          this.buildScript();
        }
      })
      .catch(() => {

      });
  }

  public openExport = () => {
    const modal = this.modalService.open(ExportComponent, {
      backdrop: "static",
      centered: true,
      keyboard: false,
    });
    (modal.componentInstance as ExportComponent).setOutput(this.macroGroups);
  }

  public copyResultToClipboard = () => {
    clipboard.writeText(this.macroScript);
  }

  public buildScript = () => {
    let macro = new Macro();

    this.macroGroups.forEach((group) => {

      for(let i = 1; i <= group.repeat; i++) {
        group.items.forEach((item) => {
          macro.pipe((<IMacroAction>ALL_ACTIONS[item.type]).macroBuilder(item.option));
        });
      }

    });

    this.macroScript = macro.toString();
  }
}
