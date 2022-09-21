import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IEditorComponent } from "../../interfaces/editorComponent";

@Component({
  templateUrl: "./editor.html",
})
export class ClickMultipleSlotsEditorComponent implements IEditorComponent {
  public formGroup: FormGroup = null;

  public timestamp: string = ""; // use this timestamp to dynamically build html id and label for attributes

  constructor() {
    this.timestamp = Date.now().toString();
  }

  public setFormGroup(formGroup: FormGroup) {
    this.formGroup = formGroup;
  }
}
