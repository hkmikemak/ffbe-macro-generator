import { CLICK_DELAY, Macro } from "../../memuMacro";
import { clickSlot } from "./clickSlot";

export interface IClickMultipleSlotsOption {
  slots: number[];
}

export const clickMultipleSlots = (option: IClickMultipleSlotsOption) =>
  (source: Macro) => option.slots.reduce(
    (aggregatedSource, currentSlot) => {
      aggregatedSource.pipe(clickSlot({slot: currentSlot}));
      aggregatedSource.currentFrame -= CLICK_DELAY;
      return aggregatedSource;
    }
    , source,
  );
