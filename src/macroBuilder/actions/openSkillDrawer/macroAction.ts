import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IMacroAction } from "../..";
import { IOpenSkillDrawerOption, openSkillDrawer } from "../../../ffbeMacro";
import {  OpenSkillDrawerEditorComponent } from "./editor";

export const OpenSkillDrawerMacroAction = {
  displayOption: (option: any) => {
    const delayOption = option as IOpenSkillDrawerOption;
    return `Slot ${delayOption.slot}`;
  },
  editorComponent: OpenSkillDrawerEditorComponent,
  formGroupToOption: (formGroup: FormGroup) => ({ slot: formGroup.get("slot").value } as IOpenSkillDrawerOption),
  macroBuilder: openSkillDrawer,
  optionToFormGroup: (option?: any) => {
    const result = new FormGroup({
      slot: new FormControl("", [Validators.required, Validators.min(1), Validators.max(6)]),
    });

    if (option) {
      const delayOption = option as IOpenSkillDrawerOption;
      result.get("slot").setValue(delayOption.slot);
    }

    return result;
  },
} as IMacroAction;
