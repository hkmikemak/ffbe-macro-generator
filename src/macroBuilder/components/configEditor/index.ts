import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MacroConfigService, MacroGroupService } from "../..";
import { IClickOption } from "../../../memuMacro";

@Component({
  templateUrl: "./index.html",
})
export class ConfigEditorComponent {

  public formGroup: FormGroup = null;
  public mode: string;

  constructor(
    public activeModal: NgbActiveModal,
    private macroGroupService: MacroGroupService,
    private macroConfigService: MacroConfigService
  ) {
    const currentConfig = this.macroConfigService.getValue();

    this.formGroup = new FormGroup({
      framePerSecond: new FormControl(currentConfig.framePerSecond, [Validators.required, Validators.min(0)]),
      screenHeight: new FormControl(currentConfig.screenHeight, [Validators.required, Validators.min(0)]),
      screenWidth: new FormControl(currentConfig.screenWidth, [Validators.required, Validators.min(0)]),
    });

    this.mode = currentConfig.mode;
  }

  public setMode(value: string) {
    this.mode = value;
  }

  public submit() {
    const currentConfig = this.macroConfigService.getValue();
    const newConfig = {
      framePerSecond: this.formGroup.get("framePerSecond").value,
      mode: this.mode,
      screenHeight: this.formGroup.get("screenHeight").value,
      screenWidth: this.formGroup.get("screenWidth").value,
    };

    const currentMacroGroup = this.macroGroupService.getValue();
    currentMacroGroup.forEach((group) => {
      group.items.filter((item) => item.type === "Click").forEach((item) => {
        const option: IClickOption = item.option as IClickOption;
        option.position.x = Math.floor(option.position.x * newConfig.screenWidth / currentConfig.screenWidth);
        option.position.y = Math.floor(option.position.y * newConfig.screenHeight / currentConfig.screenHeight);
      });
    });

    this.macroGroupService.updateCurrent();
    this.macroConfigService.setValue(newConfig);
    this.activeModal.close();
  }
}
