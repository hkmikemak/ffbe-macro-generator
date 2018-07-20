import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ALL_ACTIONS, IMacroItem } from "../..";
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

  public actions = ALL_ACTIONS;

  constructor(private modalService: NgbModal) { }

  public openEditDialog() {
    const modal = this.modalService.open(MacroItemEditorComponent, {
      backdrop: "static",
      centered: true,
      keyboard: false,
    });

    (modal.componentInstance as MacroItemEditorComponent).setOption(this.item);

    modal.result
      .then((result: IMacroItem) => { if (result) { this.itemUpdated.emit(result); } })
      .catch(() => undefined);
  }

}
