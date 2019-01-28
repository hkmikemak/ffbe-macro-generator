import { getSlotPosition } from "..";
import { Macro, MacroConfig } from "../../memuMacro";

export interface IClickMultipleSlotsOption {
  slots: number[];
}

const CLICK_WAIT = 100;

export const clickMultipleSlots = (option: IClickMultipleSlotsOption) =>
  (source: Macro, config: MacroConfig) => option.slots.reduce(
    (aggregatedSource, currentSlot) => {
      const slotPosition = getSlotPosition(currentSlot, config);
      aggregatedSource.scripts.push(`${aggregatedSource.currentFrame}--VINPUT--MULTI2:1:0:0:${slotPosition.x}:${slotPosition.y}:0`);
      aggregatedSource.currentFrame += CLICK_WAIT;
      aggregatedSource.scripts.push(`${source.currentFrame}--VINPUT--MULTI2:1:0:-1:-1:-2:2`);
      aggregatedSource.currentFrame -= CLICK_WAIT;
      return aggregatedSource;
    }
    , source
  );
