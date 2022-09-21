import { FormControl, FormGroup, Validators } from '@angular/forms'
import { IMacroAction } from '../..'
import { drag, IDragOption } from '../../../memuMacro'
import { DragEditorComponent } from './editor'

export const DragMacroAction = {
  displayOption: (option: any) => {
    const dragOption = option as IDragOption
    return `${dragOption.startPosition.x},${dragOption.startPosition.y} - ${dragOption.endPosition.x},${dragOption.endPosition.y}`
  },
  editorComponent: DragEditorComponent,
  formGroupToOption: (formGroup: FormGroup) => ({ easingFunction: formGroup.get('easingFunction').value, startPosition: { x: formGroup.get('from_x').value, y: formGroup.get('from_y').value }, endPosition: { x: formGroup.get('to_x').value, y: formGroup.get('to_y').value } } as IDragOption),
  macroBuilder: drag,
  optionToFormGroup: (option?: any) => {
    const result = new FormGroup({
      easingFunction: new FormControl(null, [Validators.required]),
      from_x: new FormControl<number>(null, [Validators.required, Validators.min(0), Validators.max(720)]),
      from_y: new FormControl<number>(null, [Validators.required, Validators.min(0), Validators.max(1280)]),
      to_x: new FormControl<number>(null, [Validators.required, Validators.min(0), Validators.max(720)]),
      to_y: new FormControl<number>(null, [Validators.required, Validators.min(0), Validators.max(1280)]),
    })

    if (option) {
      const dragOption = option as IDragOption
      result.get('from_x').setValue(dragOption.startPosition.x)
      result.get('from_y').setValue(dragOption.startPosition.y)
      result.get('to_x').setValue(dragOption.endPosition.x)
      result.get('to_y').setValue(dragOption.endPosition.y)
      result.get('easingFunction').setValue(dragOption.easingFunction)
    }

    return result
  },
} as IMacroAction
