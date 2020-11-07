import { FormControl, FormGroup, Validators } from '@angular/forms'
import { IMacroAction } from '../..'
import { clickSlot, IClickSlotOption } from '../../../ffbeMacro'
import { ClickSlotEditorComponent } from './editor'

export const ClickSlotMacroAction = {
  displayOption: (option: any) => {
    const clickOption = option as IClickSlotOption
    return `Slot ${clickOption.slot}`
  },
  editorComponent: ClickSlotEditorComponent,
  formGroupToOption: (formGroup: FormGroup) => ({ slot: formGroup.get('slot').value } as IClickSlotOption),
  macroBuilder: clickSlot,
  optionToFormGroup: (option?: any) => {
    const result = new FormGroup({
      slot: new FormControl('', [Validators.required, Validators.min(1), Validators.max(6)])
    })

    if (option) {
      const clickOption = option as IClickSlotOption
      result.get('slot').setValue(clickOption.slot)
    }

    return result
  }
} as IMacroAction
