import { FormControl, FormGroup, Validators } from '@angular/forms'
import { IMacroAction } from '../..'
import { delay, IDelayOption } from '../../../memuMacro'
import { DelayEditorComponent } from './editor'

export const DelayMacroAction = {
  displayOption: (option: any) => {
    const delayOption = option as IDelayOption
    return `${delayOption.second}s`
  },
  editorComponent: DelayEditorComponent,
  formGroupToOption: (formGroup: FormGroup) => ({ second: formGroup.get('second').value } as IDelayOption),
  macroBuilder: delay,
  optionToFormGroup: (option?: any) => {
    const result = new FormGroup({
      second: new FormControl('', [Validators.required, Validators.min(0)])
    })

    if (option) {
      const delayOption = option as IDelayOption
      result.get('second').setValue(delayOption.second)
    }

    return result
  }
} as IMacroAction
