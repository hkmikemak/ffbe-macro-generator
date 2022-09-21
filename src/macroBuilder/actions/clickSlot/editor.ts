import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { IEditorComponent } from '../../interfaces/editorComponent'

@Component({
  templateUrl: './editor.html',
})
export class ClickSlotEditorComponent implements IEditorComponent {
  public formGroup: FormGroup = null;

  public setFormGroup (formGroup: FormGroup) {
    this.formGroup = formGroup
  }
}
