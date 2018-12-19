import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MacroConfigService } from "../..";

@Component({
  templateUrl: "./index.html",
})
export class ConfigEditorComponent {

  public formGroup: FormGroup = null;

  constructor(
    public activeModal: NgbActiveModal,
    private macroConfigService: MacroConfigService,
  ) {
    const currentConfig = this.macroConfigService.getValue();

    this.formGroup = new FormGroup({
      clickDelay: new FormControl(currentConfig.clickDelay, [ Validators.required, Validators.min(0)]),
      framePerSecond: new FormControl(currentConfig.framePerSecond, [ Validators.required, Validators.min(0)]),
      screenHeight: new FormControl(currentConfig.screenHeight, [ Validators.required, Validators.min(0)]),
      screenWidth: new FormControl(currentConfig.screenWidth, [ Validators.required, Validators.min(0)]),
    });
  }

  public submit() {
    const newConfig = {
      clickDelay: this.formGroup.get("clickDelay").value,
      framePerSecond: this.formGroup.get("framePerSecond").value,
      screenHeight: this.formGroup.get("screenHeight").value,
      screenWidth: this.formGroup.get("screenWidth").value,
    };
    this.macroConfigService.setValue(newConfig);
    this.activeModal.close();
  }
}
