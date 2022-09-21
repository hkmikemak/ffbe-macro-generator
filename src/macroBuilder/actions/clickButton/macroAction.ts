import { FormControl, FormGroup } from '@angular/forms'
import { IMacroAction } from '../..'
import { clickButton } from '../../../ffbeMacro'
import { IClickOption } from '../../../memuMacro'
import { ClickButtonEditorComponent } from './editor'

export const ClickButtonMacroAction = {
  displayOption: (option: any) => {
    const clickOption = option as IClickOption
    return `${clickOption.position.x},${clickOption.position.y}`
  },
  editorComponent: ClickButtonEditorComponent,
  formGroupToOption: (formGroup: FormGroup) =>
    ({
      position: { x: formGroup.get('x').value, y: formGroup.get('y').value },
    } as IClickOption),
  macroBuilder: clickButton,
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
