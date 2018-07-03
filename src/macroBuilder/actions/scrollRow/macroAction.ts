import {  ScrollRowEditorComponent } from "./editor";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IMacroAction } from "../..";
import { IScrollRowOption, scrollRow } from "../../../ffbeMacro";

export const ScrollRowMacroAction = {
  displayOption: (option: any) => {
    const delayOption = option as IScrollRowOption;
    return `${delayOption.direction.toUpperCase()} ${delayOption.rows} Rows`;
  },
  macroBuilder: scrollRow,
  editorComponent: ScrollRowEditorComponent,
  formGroupToOption: (formGroup: FormGroup) => ({ rows: formGroup.get('rows').value, direction: formGroup.get('direction').value } as IScrollRowOption),
  optionToFormGroup: (option?: any) => {
    let result = new FormGroup({
      rows: new FormControl('', [Validators.required, Validators.min(1)]),
      direction: new FormControl('', [Validators.required]),
    });

    if (option) {
      let delayOption = <IScrollRowOption>option;
      result.get('rows').setValue(delayOption.rows);
      result.get('direction').setValue(delayOption.direction);
    }

    return result;
  }
} as IMacroAction
