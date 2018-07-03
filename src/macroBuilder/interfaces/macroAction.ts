import { Macro } from "../../memuMacro";
import { FormGroup } from "@angular/forms";
import { Type } from "@angular/core";

export interface IMacroAction {
  displayOption: (option: any) => string;
  editorComponent: Type<{}>;
  macroBuilder: (option: any) => ((macro: Macro) => Macro);
  optionToFormGroup: (option?:any) => FormGroup;
  formGroupToOption: (formGroup: FormGroup) => any;
}
