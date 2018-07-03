import { IClickOption, click } from "../../../memuMacro";
import { ClickEditorComponent } from "./editor";
import { IMacroAction } from "../..";
import { FormGroup, FormControl, Validators } from "@angular/forms";

export const ClickMacroAction = {
  displayOption: (option: any) => {
    const clickOption = option as IClickOption;
    return `${clickOption.position.x},${clickOption.position.y}`;
  },
  macroBuilder: click,
  editorComponent: ClickEditorComponent,
  formGroupToOption: (formGroup: FormGroup) => ({ position: { x: formGroup.get('x').value, y: formGroup.get('y').value } } as IClickOption),
  optionToFormGroup: (option?: any) => {
    let result = new FormGroup({
      x: new FormControl('', [Validators.required, Validators.min(0), Validators.max(720)]),
      y: new FormControl('', [Validators.required, Validators.min(0), Validators.max(1280)])
    });

    if(option) {
      let clickOption = <IClickOption> option;
      result.get('x').setValue(clickOption.position.x);
      result.get('y').setValue(clickOption.position.y);
    }

    return result;
  }
} as IMacroAction
