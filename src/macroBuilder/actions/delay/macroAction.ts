import { IDelayOption, delay } from "../../../memuMacro";
import { DelayEditorComponent } from "./editor";
import { IMacroAction } from "../..";
import { FormGroup, FormControl, Validators } from "@angular/forms";

export const DelayMacroAction = {
  displayOption: (option: any) => {
    const delayOption = option as IDelayOption;
    return `${delayOption.second}s`;
  },
  macroBuilder: delay,
  editorComponent: DelayEditorComponent,
  formGroupToOption: (formGroup: FormGroup) => ({ second: formGroup.get('second').value } as IDelayOption),
  optionToFormGroup: (option?: any) => {
    let result = new FormGroup({
      second: new FormControl('', [Validators.required, Validators.min(0)])
    });

    if (option) {
      let delayOption = <IDelayOption>option;
      result.get('second').setValue(delayOption.second);
    }

    return result;
  }
} as IMacroAction
