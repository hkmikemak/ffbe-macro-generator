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

      if (config.mode === "MEmu") {
        aggregatedSource.scripts.push(`${aggregatedSource.currentFrame}--VINPUT--MULTI2:1:0:0:${slotPosition.x}:${slotPosition.y}:0`);
        aggregatedSource.currentFrame += CLICK_WAIT;
        aggregatedSource.scripts.push(`${aggregatedSource.currentFrame}--VINPUT--MULTI2:1:0:-1:-1:-2:2`);
        aggregatedSource.currentFrame -= CLICK_WAIT;
      } else if (config.mode === "Nox") {

        // 0ScRiPtSePaRaToR720|1280|MULTI:1:0:166:1088ScRiPtSePaRaToR0
        // 0ScRiPtSePaRaToR720|1280|MULTI:0:6ScRiPtSePaRaToR100
        // 0ScRiPtSePaRaToR720|1280|MULTI:0:6ScRiPtSePaRaToR100
        // 0ScRiPtSePaRaToR720|1280|MULTI:0:1ScRiPtSePaRaToR100
        // 0ScRiPtSePaRaToR720|1280|MSBRL:0:0ScRiPtSePaRaToR100

        aggregatedSource.scripts.push(`0ScRiPtSePaRaToR${config.screenWidth}|${config.screenHeight}|MULTI:1:0:${slotPosition.x}:${slotPosition.y}ScRiPtSePaRaToR${aggregatedSource.currentFrame}`);
        aggregatedSource.currentFrame += CLICK_WAIT;
        aggregatedSource.scripts.push(`0ScRiPtSePaRaToR${config.screenWidth}|${config.screenHeight}|MULTI:0:6ScRiPtSePaRaToR${aggregatedSource.currentFrame}`);
        aggregatedSource.scripts.push(`0ScRiPtSePaRaToR${config.screenWidth}|${config.screenHeight}|MULTI:0:6ScRiPtSePaRaToR${aggregatedSource.currentFrame}`);
        aggregatedSource.scripts.push(`0ScRiPtSePaRaToR${config.screenWidth}|${config.screenHeight}|MULTI:0:1ScRiPtSePaRaToR${aggregatedSource.currentFrame}`);
        aggregatedSource.scripts.push(`0ScRiPtSePaRaToR${config.screenWidth}|${config.screenHeight}|MSBRL:0:0ScRiPtSePaRaToR${aggregatedSource.currentFrame}`);
        aggregatedSource.currentFrame -= CLICK_WAIT;
      }

      return aggregatedSource;
    }
    , source
  );
