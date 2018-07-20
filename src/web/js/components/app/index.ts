import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ALL_ACTIONS, ExportComponent, IMacroAction, IMacroGroup, MacroGroupService, NewMacroGroupDialogComponent } from "../../../../macroBuilder";
import { Macro } from "../../../../memuMacro";
const clipboard = require("clipboard-polyfill");

@Component({
  selector: "app-root",
  styleUrls: ["./index.css"],
  templateUrl: "./index.html",
})
export class AppComponent implements OnInit {

  public macroScript: string;

  constructor(private modalService: NgbModal, public macroGroupService: MacroGroupService) { }

  public buildScript = () => {
    const macro = new Macro();
    const groups = this.macroGroupService.getValue();

    groups.forEach((group) => {
      for (let i = 1; i <= group.repeat; i++) {
      group.items.forEach((item) => {
        macro.pipe((ALL_ACTIONS[item.type] as IMacroAction).macroBuilder(item.option));
      });
      }

    });

    this.macroScript = macro.toString();
    }

  public ngOnInit() {
    this.macroGroupService.observable.subscribe((groups) => {
      this.buildScript();
    });
  }

  public removeGroup = (index: number) => {
    const groups = this.macroGroupService.getValue();
    groups.splice(index, 1);
    this.macroGroupService.setValue(groups);
  }

  public insertGroups = (index: number, groups: IMacroGroup[], isPrepend: boolean) => {
    const oldValue = this.macroGroupService.getValue();
    if (isPrepend) {
      oldValue.splice(index, 0, ...groups);
    } else {
      if (oldValue.length - 1 === index) {
        oldValue.push(...groups);
      } else {
        oldValue.splice(index + 1, 0, ...groups);
      }
    }
    this.macroGroupService.setValue(oldValue);
  }

  public updateRepeat = (index: number, newValue: number) => {
    const oldValue = this.macroGroupService.getValue();
    if (oldValue[index].repeat !== newValue) {
      oldValue[index].repeat = newValue;
      this.macroGroupService.setValue(oldValue);
    }
  }

  public updateGroupName = (index: number, newValue: string) => {
    const oldValue = this.macroGroupService.getValue();
    if (oldValue[index].name !== newValue) {
      oldValue[index].name = newValue;
      this.macroGroupService.setValue(oldValue);
    }
  }

  public addGroup() {
    const modal = this.modalService.open(NewMacroGroupDialogComponent, {
      backdrop: "static",
      centered: true,
      keyboard: false,
    });
    modal.result
      .then((result) => {
        if (result) {
          const groups = this.macroGroupService.getValue();
          groups.push(...result);
          this.macroGroupService.setValue(groups);
        }
      })
      .catch(() => undefined);
  }

  public openExport = () => {
    this.modalService.open(ExportComponent, {
      backdrop: "static",
      centered: true,
      keyboard: false,
    });
  }

  public copyResultToClipboard = () => {
    clipboard.writeText(this.macroScript);
  }

}
