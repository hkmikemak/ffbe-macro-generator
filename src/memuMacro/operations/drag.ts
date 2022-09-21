import { MacroConfig } from '../interfaces/config'
import { IPosition } from '../interfaces/position'
import { Macro } from '../models/macro'
import { delay } from './delay'

const DURATION_IN_SECOND = 0.8
const TIMEING_STEP = 10
const DELAY_BEFORE = 0.4
const DELAY_AFTER = 0.4
const EASING_POWER = 6

const easingFunctions = {
  easeIn: (power) => (t) => Math.pow(t, power),
  easeInOut: (power) => (t) => t < 0.5 ? easingFunctions.easeIn(power)(t * 2) / 2 : easingFunctions.easeOut(power)(t * 2 - 1) / 2 + 0.5,
  easeOut: (power) => (t) => 1 - Math.abs(Math.pow(t - 1, power)),
  linear: () => (t) => t,
}

export interface IDragOption {
  startPosition: IPosition;
  endPosition: IPosition;
  easingFunction: string;
}

export const drag = (option: IDragOption) =>
  (source: Macro, config: MacroConfig) => {
    source.pipe(config, delay({ second: DELAY_BEFORE }))

    if (config.mode === 'MEmu') {
      const easing = easingFunctions[option.easingFunction](EASING_POWER)
      const frameDiff = Math.floor(config.framePerSecond * DURATION_IN_SECOND / TIMEING_STEP)

      for (let currentStep = 0; currentStep <= TIMEING_STEP; currentStep++) {
        source.currentFrame += frameDiff

        if (currentStep === 0) {
          // Initial Step (Add Mouse Down)
          source.scripts.push(`${source.currentFrame}--VINPUT--MULTI2:1:0:0:${option.startPosition.x}:${option.startPosition.y}:0`)
        } else if (currentStep === TIMEING_STEP) {
          // Final Step (Mouse move to final position)
          source.scripts.push(`${source.currentFrame}--VINPUT--MULTI2:1:0:0:${option.endPosition.x}:${option.endPosition.y}:1`)
        } else {
          // Middle Step (Mouse move to calculated position)
          const timeInEasing = currentStep / TIMEING_STEP
          const progress = easing(timeInEasing)
          const newX = Math.floor(option.startPosition.x + (option.endPosition.x - option.startPosition.x) * progress)
          const newY = Math.floor(option.startPosition.y + (option.endPosition.y - option.startPosition.y) * progress)
          source.scripts.push(`${source.currentFrame}--VINPUT--MULTI2:1:0:0:${newX}:${newY}:1`)
        }
      }

      // Add Mouse up
      source.currentFrame += frameDiff
      source.scripts.push(`${source.currentFrame}--VINPUT--MULTI2:1:0:-1:-1:-1:2`)
    } else if (config.mode === 'Nox') {
      //
      // 0ScRiPtSePaRaToR720|1280|MULTI:1:2:388:1141ScRiPtSePaRaToR1208
      // 0ScRiPtSePaRaToR720|1280|MULTI:1:2:387:1136ScRiPtSePaRaToR1216
      // 0ScRiPtSePaRaToR720|1280|MULTI:1:2:387:1131ScRiPtSePaRaToR1223
      // 0ScRiPtSePaRaToR720|1280|MULTI:1:2:387:1128ScRiPtSePaRaToR1232
      // 0ScRiPtSePaRaToR720|1280|MULTI:1:2:362:881ScRiPtSePaRaToR1776
      // 0ScRiPtSePaRaToR720|1280|MULTI:1:2:362:878ScRiPtSePaRaToR1792
      // 0ScRiPtSePaRaToR720|1280|MULTI:1:2:362:876ScRiPtSePaRaToR1800
      // 0ScRiPtSePaRaToR720|1280|MULTI:1:2:362:875ScRiPtSePaRaToR1816
      // 0ScRiPtSePaRaToR720|1280|MULTI:1:2:362:873ScRiPtSePaRaToR1832
      // 0ScRiPtSePaRaToR720|1280|MULTI:1:2:362:872ScRiPtSePaRaToR1848
      // 0ScRiPtSePaRaToR720|1280|MULTI:1:2:362:870ScRiPtSePaRaToR1872
      // 0ScRiPtSePaRaToR720|1280|MULTI:0:6ScRiPtSePaRaToR2000
      // 0ScRiPtSePaRaToR720|1280|MULTI:0:6ScRiPtSePaRaToR2000
      // 0ScRiPtSePaRaToR720|1280|MULTI:0:1ScRiPtSePaRaToR2000
      // 0ScRiPtSePaRaToR720|1280|MSBRL:0:0ScRiPtSePaRaToR2001

      const easing = easingFunctions[option.easingFunction](EASING_POWER)
      const frameDiff = Math.floor(1000 * DURATION_IN_SECOND / TIMEING_STEP)

      for (let currentStep = 0; currentStep <= TIMEING_STEP; currentStep++) {
        source.currentFrame += frameDiff

        if (currentStep === 0) {
          // Initial Step (Add Mouse Down)
          source.scripts.push(`0ScRiPtSePaRaToR${config.screenWidth}|${config.screenHeight}|MULTI:1:0:${option.startPosition.x}:${option.startPosition.y}ScRiPtSePaRaToR${source.currentFrame}`)
        } else if (currentStep === TIMEING_STEP) {
          // Final Step (Mouse move to final position)
          source.scripts.push(`0ScRiPtSePaRaToR${config.screenWidth}|${config.screenHeight}|MULTI:1:2:${option.endPosition.x}:${option.endPosition.y}ScRiPtSePaRaToR${source.currentFrame}`)
        } else {
          // Middle Step (Mouse move to calculated position)
          const timeInEasing = currentStep / TIMEING_STEP
          const progress = easing(timeInEasing)
          const newX = Math.floor(option.startPosition.x + (option.endPosition.x - option.startPosition.x) * progress)
          const newY = Math.floor(option.startPosition.y + (option.endPosition.y - option.startPosition.y) * progress)
          source.scripts.push(`0ScRiPtSePaRaToR${config.screenWidth}|${config.screenHeight}|MULTI:1:2:${newX}:${newY}ScRiPtSePaRaToR${source.currentFrame}`)
        }
      }

      // Add Mouse up
      source.currentFrame += frameDiff
      source.scripts.push(`0ScRiPtSePaRaToR${config.screenWidth}|${config.screenHeight}|MULTI:0:6ScRiPtSePaRaToR${source.currentFrame}`)
      source.scripts.push(`0ScRiPtSePaRaToR${config.screenWidth}|${config.screenHeight}|MULTI:0:6ScRiPtSePaRaToR${source.currentFrame}`)
      source.scripts.push(`0ScRiPtSePaRaToR${config.screenWidth}|${config.screenHeight}|MULTI:0:1ScRiPtSePaRaToR${source.currentFrame}`)
      source.scripts.push(`0ScRiPtSePaRaToR${config.screenWidth}|${config.screenHeight}|MSBRL:0:0ScRiPtSePaRaToR${source.currentFrame}`)
    }

    return source.pipe(config, delay({ second: DELAY_AFTER }))
  }
