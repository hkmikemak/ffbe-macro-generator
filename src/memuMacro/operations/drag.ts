import { FRAME_PER_SECOND } from "../constants";
import { IPosition } from "../interfaces/position";
import { Macro } from "../models/macro";
import { delay } from "./delay";

const DURATION_IN_SECOND = 1;
const TIMEING_STEP = 10;
const DELAY_BEFORE = 0.5;
const DELAY_AFTER = 0.5;
const EASING_POWER = 4;

const easingFunctions = {
  easeIn: (power) => ((t) => Math.pow(t, power)),
  easeInOut: (power) => ((t) => t < .5 ? easingFunctions.easeIn(power)(t * 2) / 2 : easingFunctions.easeOut(power)(t * 2 - 1) / 2 + 0.5),
  easeOut: (power) => ((t) => 1 - Math.abs(Math.pow(t - 1, power))),
  linear: () => ((t) => t),
};

export interface IDragOption {
  startPosition: IPosition;
  endPosition: IPosition;
  easingFunction: string;
}

export const drag = (option: IDragOption) => {
  return (source: Macro) => {
    // console.log(`Draging from ${option.startPosition.x},${option.endPosition.y} to ${option.endPosition.x},${option.endPosition.y}`);

    source.pipe(delay({second: DELAY_BEFORE}));

    const easing = easingFunctions[option.easingFunction](EASING_POWER);
    const frameDiff = Math.floor(FRAME_PER_SECOND * DURATION_IN_SECOND / TIMEING_STEP);

    for (let currentStep = 0; currentStep <= TIMEING_STEP; currentStep++) {
      source.currentFrame += frameDiff;

      if (currentStep === 0) {
        // Initial Step (Add Mouse Down)
        source.scripts.push(`${source.currentFrame}--VINPUT--MULTI:1:0:${option.startPosition.x}:${option.startPosition.y}`);
      } else if (currentStep === TIMEING_STEP) {
        // Final Step (Add Mouse Up)
        source.scripts.push(`${source.currentFrame}--VINPUT--MULTI:1:1:${option.endPosition.x}:${option.endPosition.y}`);
      } else {
        // Middle Step (Mouse Move)
        const timeInEasing = currentStep / TIMEING_STEP;
        const progress = easing(timeInEasing);
        const newX = Math.floor(option.startPosition.x + (option.endPosition.x - option.startPosition.x) * progress);
        const newY = Math.floor(option.startPosition.y + (option.endPosition.y - option.startPosition.y) * progress);
        // console.log(`Step: ${currentStep}, Timing: ${timeInEasing}, Progress: ${progress}, ${newX},${newY}`);
        source.scripts.push(`${source.currentFrame}--VINPUT--MULTI:1:2:${newX}:${newY}`);
      }
    }

    source.currentFrame += frameDiff;
    source.scripts.push(`${source.currentFrame}--VINPUT--MULTI:1:1:0:0`);

    return source.pipe(delay({ second: DELAY_AFTER }));
  };
};
