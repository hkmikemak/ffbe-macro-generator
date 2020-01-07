import { MacroConfig } from "../interfaces/config";
import { IPosition } from "../interfaces/position";
import { Macro } from "../models/macro";

export interface IClickOption {
  position: IPosition;
}

const CLICK_WAIT = 100;

export const click: (option: IClickOption) => ((source: Macro, config: MacroConfig) => Macro) = (option: IClickOption) =>
  (source: Macro, config: MacroConfig) => {
    if (config.mode === "Nox") {
      source.scripts.push(`0ScRiPtSePaRaToR${config.screenWidth}|${config.screenHeight}|MULTI:1:0:${option.position.x}:${option.position.y}ScRiPtSePaRaToR${source.currentFrame}`);
      source.currentFrame += CLICK_WAIT;
      source.scripts.push(`0ScRiPtSePaRaToR${config.screenWidth}|${config.screenHeight}|MULTI:0:6ScRiPtSePaRaToR${source.currentFrame}`);
      source.scripts.push(`0ScRiPtSePaRaToR${config.screenWidth}|${config.screenHeight}|MULTI:0:6ScRiPtSePaRaToR${source.currentFrame}`);
      source.scripts.push(`0ScRiPtSePaRaToR${config.screenWidth}|${config.screenHeight}|MULTI:0:1ScRiPtSePaRaToR${source.currentFrame}`);
      source.scripts.push(`0ScRiPtSePaRaToR${config.screenWidth}|${config.screenHeight}|MSBRL:0:0ScRiPtSePaRaToR${source.currentFrame}`);
    } else if (config.mode === "MEmu") {
      source.scripts.push(`${source.currentFrame}--VINPUT--MULTI2:1:0:0:${option.position.x}:${option.position.y}:0`);
      source.currentFrame += CLICK_WAIT;
      source.scripts.push(`${source.currentFrame}--VINPUT--MULTI2:1:0:-1:-1:-2:2`);
    }

    return source;
  };
