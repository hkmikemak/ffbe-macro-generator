import { FRAME_PER_SECOND } from "../constants";
import { Macro } from "../models/macro";

export interface IDelayOption {
  second: number;
}

export const delay: (option: IDelayOption) => ((source: Macro) => Macro) = (option: IDelayOption) =>
  (source: Macro) => {
    source.currentFrame += Math.floor(FRAME_PER_SECOND * option.second);
    source.scripts.push(`${source.currentFrame}--VINPUT--MOUSE:0:0`);
    return source;
  };
