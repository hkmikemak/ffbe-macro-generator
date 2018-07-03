import { ClickMultipleSlotsEditorComponent } from "./editor";
import { IMacroAction } from "../..";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IClickMultipleSlotsOption, clickMultipleSlots } from "../../../ffbeMacro";

export const ClickMultipleSlotsMacroAction = {
  displayOption: (option: any) => {
    const clickOption = option as IClickMultipleSlotsOption;
    return `Slots: ${clickOption.slots.join(', ')}`;
  },
  macroBuilder: clickMultipleSlots,
  editorComponent: ClickMultipleSlotsEditorComponent,
  formGroupToOption: (formGroup: FormGroup) => {
    let values = formGroup.value;
    let slots: number[] = [];

    Object.keys(values).forEach((key) => {
      if (values[key] === true) {
        slots.push(parseInt(key.replace('slot_', '')));
      }
    });
    return { slots } as IClickMultipleSlotsOption;
  },
  optionToFormGroup: (option?: any) => {
    let result = new FormGroup({
      slot_1: new FormControl(false, []),
      slot_2: new FormControl(false, []),
      slot_3: new FormControl(false, []),
      slot_4: new FormControl(false, []),
      slot_5: new FormControl(false, []),
      slot_6: new FormControl(false, []),
    });

    if (option) {
      let clickOption = <IClickMultipleSlotsOption>option;
      clickOption.slots.map((i) => `slot_${i}`).forEach((i) => {
        result.get(i).setValue(true);
      });
    }

    return result;
  }
} as IMacroAction
