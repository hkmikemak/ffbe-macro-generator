import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IMacroItem, ALL_ACTIONS } from "../..";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MacroItemEditorComponent } from "../macroItemEditor";

@Component({
  selector: "macro-item",
  templateUrl: "./index.html",
})
export class MacroItemComponent {
  @Input() public item: IMacroItem;
  @Input() public canMoveUp: boolean;
  @Input() public canMoveDown: boolean;

  @Output() public itemMovedUp: EventEmitter<void> = new EventEmitter<void>();
  @Output() public itemMovedDown: EventEmitter<void> = new EventEmitter<void>();
  @Output() public itemDeleted: EventEmitter<void> = new EventEmitter<void>();
  @Output() public itemUpdated: EventEmitter<IMacroItem> = new EventEmitter<IMacroItem>();

  constructor(private modalService: NgbModal) { }

  public actions = ALL_ACTIONS;

  openEditDialog() {
    let modal = this.modalService.open(MacroItemEditorComponent, {
      backdrop: "static",
      centered: true,
      keyboard: false,
    });

    (<MacroItemEditorComponent>modal.componentInstance).setOption(this.item);

    modal.result
      .then((result: IMacroItem) => { if (result) this.itemUpdated.emit(result); })
      .catch(() => { });
  }


}
