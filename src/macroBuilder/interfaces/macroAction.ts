import { Type } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Macro, MacroConfig } from "../../memuMacro";

export interface IMacroAction {
  displayOption: (option: any) => string;
  editorComponent: Type<{}>;
  macroBuilder: (option: any) => ((macro: Macro, config: MacroConfig) => Macro);
  optionToFormGroup: (option?: any) => FormGroup;
  formGroupToOption: (formGroup: FormGroup) => any;
}
