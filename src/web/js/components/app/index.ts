import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ExportComponent, IMacroGroup, MacroGroupService, NewMacroGroupDialogComponent } from "../../../../macroBuilder";

@Component({
  selector: "app-root",
  styleUrls: ["./index.css"],
  templateUrl: "./index.html",
})
export class AppComponent {
  constructor(private modalService: NgbModal, public macroGroupService: MacroGroupService) { }

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

  public updateGroup() {
    const oldValue = this.macroGroupService.getValue();
    this.macroGroupService.setValue(oldValue);
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

}
