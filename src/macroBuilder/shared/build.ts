import { ALL_ACTIONS, IMacroAction } from "..";
import { Macro, MacroConfig } from "../../memuMacro";
import { IMacroGroup } from "../interfaces/macroGroup";

export const buildMacro = (groups: IMacroGroup[], config: MacroConfig) => {
  const macro = new Macro();
  groups.filter((i) => i.repeat > 0).forEach((group) => {
    for (let i = 1; i <= group.repeat; i++) {
      group.items.forEach((item) => {
        macro.pipe(config, (ALL_ACTIONS[item.type] as IMacroAction).macroBuilder(item.option));
      });
    }
  });
  return macro.toString(config);
};
