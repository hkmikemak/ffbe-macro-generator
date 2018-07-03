import {  OpenSkillDrawerEditorComponent } from "./editor";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IMacroAction } from "../..";
import { IOpenSkillDrawerOption, openSkillDrawer } from "../../../ffbeMacro";

export const OpenSkillDrawerMacroAction = {
  displayOption: (option: any) => {
    const delayOption = option as IOpenSkillDrawerOption;
    return `Slot ${delayOption.slot}`;
  },
  macroBuilder: openSkillDrawer,
  editorComponent: OpenSkillDrawerEditorComponent,
  formGroupToOption: (formGroup: FormGroup) => ({ slot: formGroup.get('slot').value } as IOpenSkillDrawerOption),
  optionToFormGroup: (option?: any) => {
    let result = new FormGroup({
      slot: new FormControl('', [Validators.required, Validators.min(1), Validators.max(6)])
    });

    if (option) {
      let delayOption = <IOpenSkillDrawerOption>option;
      result.get('slot').setValue(delayOption.slot);
    }

    return result;
  }
} as IMacroAction
