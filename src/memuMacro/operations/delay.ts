import { MacroConfig } from "../interfaces/config";
import { Macro } from "../models/macro";

export interface IDelayOption {
  second: number;
}

export const delay: (option: IDelayOption) => ((source: Macro, config: MacroConfig) => Macro) = (option: IDelayOption) =>
  (source: Macro, config: MacroConfig) => {
    if(config.mode === 'Nox') {
      source.currentFrame += option.second * 1000;
      source.scripts.push(`0ScRiPtSePaRaToR${config.screenWidth}|${config.screenHeight}|MSBRL:0:0ScRiPtSePaRaToR${source.currentFrame}`);
    } else if (config.mode === 'MEmu') {
      source.currentFrame += Math.floor(config.framePerSecond * option.second);
      source.scripts.push(`${source.currentFrame}--VINPUT--MOUSE:0:0`);
    }
    return source;
  };
