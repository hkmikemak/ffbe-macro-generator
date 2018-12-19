import { MacroConfig } from "../interfaces/config";
import { Macro } from "../models/macro";

export interface IDelayOption {
  second: number;
}

export const delay: (option: IDelayOption) => ((source: Macro, config: MacroConfig) => Macro) = (option: IDelayOption) =>
  (source: Macro, config: MacroConfig) => {
    source.currentFrame += Math.floor(config.framePerSecond * option.second);
    source.scripts.push(`${source.currentFrame}--VINPUT--MOUSE:0:0`);
    return source;
  };
