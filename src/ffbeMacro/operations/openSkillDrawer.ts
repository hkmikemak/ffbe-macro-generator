import { drag, Macro, MacroConfig } from '../../memuMacro'
import { getSlotPosition } from '../constants'

const SWAP_LENGTH = 200

export interface IOpenSkillDrawerOption {
  slot: number;
}

export const openSkillDrawer = (option: IOpenSkillDrawerOption) =>
  (source: Macro, config: MacroConfig) => {
    const startPosition = getSlotPosition(option.slot, config)
    const endPosition = { x: startPosition.x + SWAP_LENGTH, y: startPosition.y }
    return source.pipe(config, drag({
      endPosition,
      startPosition,
      easingFunction: 'easeOut'
    }))
  }
