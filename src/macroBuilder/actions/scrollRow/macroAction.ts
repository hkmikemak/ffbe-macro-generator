import { FormControl, FormGroup, Validators } from '@angular/forms'
import { IMacroAction } from '../..'
import { scrollRow, IScrollRowOption } from '../../../ffbeMacro'
import { ScrollRowEditorComponent } from './editor'

export const ScrollRowMacroAction = {
  displayOption: (option: any) => {
    const delayOption = option as IScrollRowOption
    return `${delayOption.direction.toUpperCase()} ${delayOption.rows} Rows`
  },
  editorComponent: ScrollRowEditorComponent,
  formGroupToOption: (formGroup: FormGroup) => ({ rows: formGroup.get('rows').value, direction: formGroup.get('direction').value } as IScrollRowOption),
  macroBuilder: scrollRow,
  optionToFormGroup: (option?: any) => {
    const result = new FormGroup({
      direction: new FormControl('', [Validators.required]),
      rows: new FormControl('', [Validators.required, Validators.min(1)])
    })

    if (option) {
      const delayOption = option as IScrollRowOption
      result.get('rows').setValue(delayOption.rows)
      result.get('direction').setValue(delayOption.direction)
    }

    return result
  }
} as IMacroAction
