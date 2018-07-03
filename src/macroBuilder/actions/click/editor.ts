import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IEditorComponent } from "../../interfaces/editorComponent";
import { COMMON_BUTTONS } from "../../../ffbeMacro";
import { IPosition } from "../../../memuMacro";

@Component({
  templateUrl: './editor.html'
})
export class ClickEditorComponent implements IEditorComponent {
  public formGroup: FormGroup = null;

  public buttons = COMMON_BUTTONS;

  public setButton(key: string) {
    this.formGroup.get('x').setValue((<IPosition>this.buttons[key]).x);
    this.formGroup.get('y').setValue((<IPosition>this.buttons[key]).y);
  }

  public setFormGroup(formGroup: FormGroup) {
    this.formGroup = formGroup;
  }
}
