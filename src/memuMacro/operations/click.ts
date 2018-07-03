import { CLICK_DELAY } from "../constants";
import { IPosition } from "../interfaces/position";
import { Macro } from "../models/macro";

export interface IClickOption {
  position: IPosition;
}

export const click: (option: IClickOption) => ((source: Macro) => Macro) = (option: IClickOption) =>
  (source: Macro) => {
    source.scripts.push(`${source.currentFrame}--VINPUT--MULTI:1:0:${option.position.x}:${option.position.y}`);
    source.currentFrame += CLICK_DELAY;
    source.scripts.push(`${source.currentFrame}--VINPUT--MULTI:1:1:0:-1`);
    return source;
  };
