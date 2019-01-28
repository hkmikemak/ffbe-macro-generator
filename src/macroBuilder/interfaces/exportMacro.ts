import { MacroConfig } from "../../memuMacro";
import { IMacroGroup } from "./macroGroup";

export interface IExportedMacro {
  macroGroup: IMacroGroup[];
  config: MacroConfig;
}
