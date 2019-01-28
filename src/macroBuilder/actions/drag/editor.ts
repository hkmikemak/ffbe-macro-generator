import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MacroConfigService } from "../..";
import { getCommonButtonPosition } from "../../../ffbeMacro";
import { IPosition } from "../../../memuMacro";
import { IEditorComponent } from "../../interfaces/editorComponent";

@Component({
  templateUrl: "./editor.html",
})
export class DragEditorComponent implements IEditorComponent {
  public formGroup: FormGroup = null;

  public buttons = getCommonButtonPosition(this.configService.getValue());

  constructor(private configService: MacroConfigService) { }

  // public setButton(key: string) {
  //   this.formGroup.get("x").setValue((this.buttons[key] as IPosition).x);
  //   this.formGroup.get("y").setValue((this.buttons[key] as IPosition).y);
  // }

  public setFormGroup(formGroup: FormGroup) {
    this.formGroup = formGroup;
  }
}
