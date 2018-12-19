import { Macro, MacroConfig } from "../../memuMacro";
import { clickSlot } from "./clickSlot";

export interface IClickMultipleSlotsOption {
  slots: number[];
}

export const clickMultipleSlots = (option: IClickMultipleSlotsOption) =>
  (source: Macro, config: MacroConfig) => option.slots.reduce(
    (aggregatedSource, currentSlot) => {
      aggregatedSource.pipe(config, clickSlot({slot: currentSlot}));
      aggregatedSource.currentFrame -= config.clickDelay;
      return aggregatedSource;
    }
    , source,
  );
