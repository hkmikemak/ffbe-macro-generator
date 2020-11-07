import { FormControl, FormGroup } from '@angular/forms'
import { IMacroAction } from '../..'
import {
  clickMultipleSlots,
  IClickMultipleSlotsOption
} from '../../../ffbeMacro'
import { ClickMultipleSlotsEditorComponent } from './editor'

export const ClickMultipleSlotsMacroAction = {
  displayOption: (option: any) => {
    const clickOption = option as IClickMultipleSlotsOption
    return `Slots: ${clickOption.slots.join(', ')}`
  },
  editorComponent: ClickMultipleSlotsEditorComponent,
  formGroupToOption: (formGroup: FormGroup) => {
    const values = formGroup.value
    const slots: number[] = []

    Object.keys(values).forEach((key) => {
      if (values[key] === true) {
        slots.push(parseInt(key.replace('slot_', ''), 10))
      }
    })
    return { slots } as IClickMultipleSlotsOption
  },
  macroBuilder: clickMultipleSlots,
  optionToFormGroup: (option?: any) => {
    const result = new FormGroup({
      slot_1: new FormControl(false, []),
      slot_2: new FormControl(false, []),
      slot_3: new FormControl(false, []),
      slot_4: new FormControl(false, []),
      slot_5: new FormControl(false, []),
      slot_6: new FormControl(false, [])
    })

    if (option) {
      const clickOption = option as IClickMultipleSlotsOption
      clickOption.slots
        .map((i) => `slot_${i}`)
        .forEach((i) => {
          result.get(i).setValue(true)
        })
    }

    return result
  }
} as IMacroAction
