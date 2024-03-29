import { Component } from '@angular/core'
import { FormGroup, Validators } from '@angular/forms'
import { MacroConfigService } from '../..'
import { getCommonButtonPosition } from '../../../ffbeMacro'
import { IPosition } from '../../../memuMacro'
import { IEditorComponent } from '../../interfaces/editorComponent'

@Component({
  templateUrl: './editor.html',
})
export class ClickEditorComponent implements IEditorComponent {
  public formGroup: FormGroup = null;

  public buttons = getCommonButtonPosition(this.configService.getValue());

  constructor (private configService: MacroConfigService) { }

  public setButton (key: string) {
    this.formGroup.get('x').setValue((this.buttons[key] as IPosition).x)
    this.formGroup.get('y').setValue((this.buttons[key] as IPosition).y)
  }

  public setFormGroup (formGroup: FormGroup) {
    this.formGroup = formGroup
    this.formGroup.get('x').setValidators([Validators.required, Validators.min(0), Validators.max(this.configService.getValue().screenWidth)])
    this.formGroup.get('x').setValidators([Validators.required, Validators.min(0), Validators.max(this.configService.getValue().screenHeight)])
  }
}
