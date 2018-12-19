import { MacroConfig } from "../interfaces/config";
import { IPosition } from "../interfaces/position";
import { Macro } from "../models/macro";

export interface IClickOption {
  position: IPosition;
}

export const click: (option: IClickOption) => ((source: Macro, config: MacroConfig) => Macro) = (option: IClickOption) =>
  (source: Macro, config: MacroConfig) => {
    source.scripts.push(`${source.currentFrame}--VINPUT--MULTI2:1:0:0:${option.position.x}:${option.position.y}:0`);
    source.currentFrame += config.clickDelay;
    source.scripts.push(`${source.currentFrame}--VINPUT--MULTI2:1:0:-1:-1:-2:2`);
    return source;
  };
