import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { COMMON_BUTTONS } from "../../../ffbeMacro";
import { IPosition } from "../../../memuMacro";
import { IEditorComponent } from "../../interfaces/editorComponent";

@Component({
  templateUrl: "./editor.html",
})
export class ClickEditorComponent implements IEditorComponent {
  public formGroup: FormGroup = null;

  public buttons = COMMON_BUTTONS;

  public setButton(key: string) {
    this.formGroup.get("x").setValue((this.buttons[key] as IPosition).x);
    this.formGroup.get("y").setValue((this.buttons[key] as IPosition).y);
  }

  public setFormGroup(formGroup: FormGroup) {
    this.formGroup = formGroup;
  }
}
