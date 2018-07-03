import { ClickSlotEditorComponent } from "./editor";
import { IMacroAction } from "../..";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IClickSlotOption, clickSlot } from "../../../ffbeMacro";

export const ClickSlotMacroAction = {
  displayOption: (option: any) => {
    const clickOption = option as IClickSlotOption;
    return `Slot ${clickOption.slot}`;
  },
  macroBuilder: clickSlot,
  editorComponent: ClickSlotEditorComponent,
  formGroupToOption: (formGroup: FormGroup) => ({ slot: formGroup.get('slot').value } as IClickSlotOption),
  optionToFormGroup: (option?: any) => {
    let result = new FormGroup({
      slot: new FormControl('', [Validators.required, Validators.min(1), Validators.max(6)])
    });

    if(option) {
      let clickOption = <IClickSlotOption> option;
      result.get('slot').setValue(clickOption.slot);
    }

    return result;
  }
} as IMacroAction
