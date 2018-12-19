import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IMacroGroup } from "../..";
import { IMacroItem } from "../../interfaces/macroItem";
import { MacroGroupService } from "../../services/macroGroupService";
import { MacroItemEditorComponent } from "../macroItemEditor";

@Component({
  selector: "macro-group",
  styleUrls: ["./index.css"],
  templateUrl: "./index.html",
})
export class MacroGroupComponent {
  @Input() public group: IMacroGroup;
  public isCollapsed: boolean = true;
  @Output() public deleteMeEvent: EventEmitter<void> = new EventEmitter();

  constructor(private modalService: NgbModal, private macroGroupService: MacroGroupService) { }

  public itemDrop(event: CdkDragDrop<IMacroItem[]>) {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.group.items, event.previousIndex, event.currentIndex);
      this.macroGroupService.updateCurrent();
    }
  }

  public deleteItem(index: number) {
    this.group.items.splice(index, 1);
    this.macroGroupService.updateCurrent();
  }

  public addItem() {
    const modal = this.modalService.open(MacroItemEditorComponent, {
      backdrop: "static",
      centered: true,
      keyboard: false,
    });
    modal.result
      .then((result: IMacroItem) => {
        if (result) {
          this.group.items.push(result);
          this.macroGroupService.updateCurrent();
        }
      })
      .catch(() => undefined);
  }

  public updateRepeat(newValue) {
    const value = parseInt(newValue, 10);
    if (!isNaN(value)) {
      this.group.repeat = value;
      this.macroGroupService.updateCurrent();
    }
  }

  public updateItem(index: number, item: IMacroItem) {
    this.group.items[index] = item;
    this.macroGroupService.updateCurrent();
  }

  public updateGroupName(newValue) {
    this.group.name = newValue;
    this.macroGroupService.updateCurrent();
  }
}
