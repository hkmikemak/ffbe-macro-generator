import { FormControl, FormGroup } from '@angular/forms'
import { IMacroAction } from '../..'
import { click, IClickOption } from '../../../memuMacro'
import { ClickEditorComponent } from './editor'

export const ClickMacroAction = {
  displayOption: (option: any) => {
    const clickOption = option as IClickOption
    return `${clickOption.position.x},${clickOption.position.y}`
  },
  editorComponent: ClickEditorComponent,
  formGroupToOption: (formGroup: FormGroup) => ({ position: { x: formGroup.get('x').value, y: formGroup.get('y').value } } as IClickOption),
  macroBuilder: click,
  optionToFormGroup: (option?: any) => {
    const result = new FormGroup({
      x: new FormControl<number>(null),
      y: new FormControl<number>(null),
    })

    if (option) {
      const clickOption = option as IClickOption
      result.get('x').setValue(clickOption.position.x)
      result.get('y').setValue(clickOption.position.y)
    }

    return result
  },
} as IMacroAction
