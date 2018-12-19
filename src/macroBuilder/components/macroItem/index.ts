import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ALL_ACTIONS, IMacroItem } from "../..";
import { MacroGroupService } from "../../services/macroGroupService";
import { MacroItemEditorComponent } from "../macroItemEditor";

@Component({
  selector: "macro-item",
  templateUrl: "./index.html",
})
export class MacroItemComponent {
  @Input() public item: IMacroItem;
  @Output() public deleteMeEvent: EventEmitter<void> = new EventEmitter();
  @Output() public updateMeEvent: EventEmitter<IMacroItem> = new EventEmitter();

  public actions = ALL_ACTIONS;

  constructor(
    private modalService: NgbModal,
    private macroGroupService: MacroGroupService,
  ) { }

  public openEditDialog() {
    const modal = this.modalService.open(MacroItemEditorComponent, {
      backdrop: "static",
      centered: true,
      keyboard: false,
    });

    (modal.componentInstance as MacroItemEditorComponent).setOption(this.item);

    modal.result
      .then((result: IMacroItem) => {
        if (result) {
          this.updateMeEvent.emit(result);
        }
      })
      .catch(() => undefined);
  }
}
