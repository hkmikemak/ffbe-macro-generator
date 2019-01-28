import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { importMacroItems, IMacroGroup, MacroConfigService } from "../..";

@Component({
  templateUrl: "./index.html",
})
export class NewMacroGroupDialogComponent {
  public hasError: boolean = false;
  public isCodeMode: boolean = null;
  public formControl: FormControl = new FormControl("", [Validators.required]);

  constructor(public activeModal: NgbActiveModal, private macroConfigService: MacroConfigService) { }

  public setCodeMode(value: boolean) {
    this.isCodeMode = value;
    this.formControl.setValue("");
    this.hasError = false;
  }

  public submit() {
    if (this.isCodeMode === false) {
      const result: IMacroGroup[] = [{ name: this.formControl.value, items: [ ], repeat: 1 }];
      this.activeModal.close(result);
    } else {
      try {
        const result: IMacroGroup[] = importMacroItems(this.formControl.value, this.macroConfigService);
        this.activeModal.close(result);
      } catch {
        this.hasError = true;
      }
    }
  }
}
