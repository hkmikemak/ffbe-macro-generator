import { MacroConfig } from "../interfaces/config";
import { IPosition } from "../interfaces/position";
import { Macro } from "../models/macro";
import { delay } from "./delay";

const DURATION_IN_SECOND = 1;
const TIMEING_STEP = 10;
const DELAY_BEFORE = 0.4;
const DELAY_AFTER = 0.4;
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
  return (source: Macro, config: MacroConfig) => {
    // console.log(`Draging from ${option.startPosition.x},${option.endPosition.y} to ${option.endPosition.x},${option.endPosition.y}`);

    source.pipe(config, delay({second: DELAY_BEFORE}));

    const easing = easingFunctions[option.easingFunction](EASING_POWER);
    const frameDiff = Math.floor(config.framePerSecond * DURATION_IN_SECOND / TIMEING_STEP);

    for (let currentStep = 0; currentStep <= TIMEING_STEP; currentStep++) {
      source.currentFrame += frameDiff;

      if (currentStep === 0) {
        // Initial Step (Add Mouse Down)
        source.scripts.push(`${source.currentFrame}--VINPUT--MULTI2:1:0:0:${option.startPosition.x}:${option.startPosition.y}:0`);
      } else if (currentStep === TIMEING_STEP) {
        // Final Step (Mouse move to final position)
        source.scripts.push(`${source.currentFrame}--VINPUT--MULTI2:1:0:0:${option.endPosition.x}:${option.endPosition.y}:1`);
      } else {
        // Middle Step (Mouse move to calculated position)
        const timeInEasing = currentStep / TIMEING_STEP;
        const progress = easing(timeInEasing);
        const newX = Math.floor(option.startPosition.x + (option.endPosition.x - option.startPosition.x) * progress);
        const newY = Math.floor(option.startPosition.y + (option.endPosition.y - option.startPosition.y) * progress);
        // console.log(`Step: ${currentStep}, Timing: ${timeInEasing}, Progress: ${progress}, ${newX},${newY}`);
        source.scripts.push(`${source.currentFrame}--VINPUT--MULTI2:1:0:0:${newX}:${newY}:1`);
      }
    }

    // Add Mouse up
    source.currentFrame += frameDiff;
    source.scripts.push(`${source.currentFrame}--VINPUT--MULTI2:1:0:-1:-1:-2:2`);

    return source.pipe(config, delay({ second: DELAY_AFTER }));
  };
};
