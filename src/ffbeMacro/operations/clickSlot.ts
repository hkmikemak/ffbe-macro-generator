import { click, Macro, MacroConfig } from "../../memuMacro";
import { getSlotPosition } from "../constants";

export interface IClickSlotOption {
  slot: number;
}

export const clickSlot = (option: IClickSlotOption) =>
  (source: Macro, config: MacroConfig) => {
    return source.pipe(config, click({ position: getSlotPosition(option.slot, config) }));
  };
