import { IPosition, MacroConfig } from '../../memuMacro'

const SLOT_POSITION: IPosition[] = [
  { x: 166, y: 832 },
  { x: 166, y: 960 },
  { x: 166, y: 1088 },
  { x: 504, y: 832 },
  { x: 504, y: 960 },
  { x: 504, y: 1088 },
]

const COMMON_BUTTON_POSITION = {
  'Brave Shift': { x: 296, y: 1241 } as IPosition,
  Depart: { x: 360, y: 1122 } as IPosition,
  'First Friend': { x: 360, y: 442 } as IPosition,
  Next: { x: 360, y: 1126 } as IPosition,
  Raid: { x: 360, y: 733 } as IPosition,
  'Raid Refill Yes': { x: 504, y: 738 } as IPosition,
  Reload: { x: 450, y: 1230 } as IPosition,
  Repeat: { x: 270, y: 1230 } as IPosition,
}

const calculatePosition = (
  value: number,
  baseValue: number,
  newBaseValue: number
) => Math.floor((newBaseValue / baseValue) * value)
export const calculateWidth = (value: number, config: MacroConfig) =>
  calculatePosition(value, 720, config.screenWidth)
export const calculateHeight = (value: number, config: MacroConfig) =>
  calculatePosition(value, 1280, config.screenHeight)

export const getSlotPosition = (
  slot: number,
  config: MacroConfig
): IPosition => {
  const selectedPosition = SLOT_POSITION[slot - 1]
  return {
    x: calculateWidth(selectedPosition.x, config),
    y: calculateHeight(selectedPosition.y, config),
  }
}

export const getCommonButtonPosition = (config: MacroConfig) => {
  const result = {}

  Object.keys(COMMON_BUTTON_POSITION).forEach((key) => {
    const position = COMMON_BUTTON_POSITION[key]
    const newPosition = {
      x: calculateWidth(position.x, config),
      y: calculateHeight(position.y, config),
    }
    result[key] = newPosition
  })

  return result
}
