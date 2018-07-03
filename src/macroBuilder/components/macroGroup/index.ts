import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IMacroGroup } from "../..";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NewMacroGroupDialogComponent } from "../newMacroGroupDialog/index";
import { IMacroItem } from "../../interfaces/macroItem";
import { MacroItemEditorComponent } from "../macroItemEditor";

@Component({
  selector: "macro-group",
  styleUrls: ["./index.css"],
  templateUrl: "./index.html",
})
export class MacroGroupComponent {
  @Input() public group: IMacroGroup;

  @Output() public groupUpdated: EventEmitter<void> = new EventEmitter<void>();
  @Output() public groupDeleted: EventEmitter<void> = new EventEmitter<void>();
  @Output() public groupsAppended: EventEmitter<IMacroGroup[]> = new EventEmitter<IMacroGroup[]>();
  @Output() public groupsPrepended: EventEmitter<IMacroGroup[]> = new EventEmitter<IMacroGroup[]>();
  @Output() public repeatChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() public nameChanged: EventEmitter<number> = new EventEmitter<number>();

  public isCollapsed: boolean = true;

  constructor(private modalService: NgbModal) { }

  public moveItem(index: number, isUp: boolean) {
    let newIndex = isUp ? index - 1 : index + 1;
    let indexes = [index, newIndex].sort((a, b) => a - b);
    this.group.items.splice(indexes[0], 2, this.group.items[indexes[1]], this.group.items[indexes[0]]);
    this.groupUpdated.emit();
  }

  public deleteItem(index: number) {
    this.group.items.splice(index, 1);
  }

  public updateItem(index: number, item: IMacroItem) {
    this.group.items[index] = item;
    this.groupUpdated.emit();
  }

  public deleteGroup() {
    this.groupDeleted.emit();
  }

  public addItem() {
    let modal = this.modalService.open(MacroItemEditorComponent, {
      backdrop: "static",
      centered: true,
      keyboard: false,
    });
    modal.result
      .then(
        (result: IMacroItem) => {
          if (result) {
            this.group.items.push(result);
            this.groupUpdated.emit();
          }
        })
      .catch(() => { });
  }

  public openDialog(isPrepend: boolean) {
    const modal = this.modalService.open(NewMacroGroupDialogComponent, {
      backdrop: "static",
      centered: true,
      keyboard: false,
    });
    modal.result
      .then((result) => {
        if (result) {
          (isPrepend ? this.groupsPrepended : this.groupsAppended).emit(result);
        }
      })
      .catch(() => {

      });
  }

  public updateRepeat(newValue) {
    let value = parseInt(newValue);
    if (!isNaN(value))
      this.repeatChanged.emit(value);
  }

  public updateGroupName(newValue) {
    this.nameChanged.emit(newValue);
  }
}