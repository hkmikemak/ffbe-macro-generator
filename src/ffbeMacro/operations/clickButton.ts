import {
  click,
  delay,
  IClickOption,
  Macro,
  MacroConfig
} from '../../memuMacro'

export interface IClickSlotOption {
  slot: number;
}

export const clickButton = (option: IClickOption) => (
  source: Macro,
  config: MacroConfig
) => source.pipe(config, click(option), delay({ second: 0.75 }))
