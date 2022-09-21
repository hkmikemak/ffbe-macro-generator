import { compressToBase64, decompressFromBase64 } from 'lz-string'
import { IClickOption } from '../../memuMacro'
import { IExportedMacro } from '../interfaces/exportMacro'
import { IMacroGroup } from '../interfaces/macroGroup'
import { MacroConfigService } from '../services/macroConfigService'
import { MacroGroupService } from '../services/macroGroupService'

export const exportMacroItems: (macroGroupService: MacroGroupService, macroConfigService: MacroConfigService) => string = (macroGroupService: MacroGroupService, macroConfigService: MacroConfigService) => {
  const iExportedMacro: IExportedMacro = {
    config: { ...macroConfigService.getValue() },
    macroGroup: [...macroGroupService.getValue()],
  }
  return compressToBase64(JSON.stringify(iExportedMacro))
}

export const importMacroItems: (s: string, macroConfigService: MacroConfigService) => IMacroGroup[] = (s: string, macroConfigService: MacroConfigService) => {
  const iExportedMacro: IExportedMacro = JSON.parse(decompressFromBase64(s)) as IExportedMacro

  const currentConfig = macroConfigService.getValue()

  iExportedMacro.macroGroup.forEach((group) => {
    group.items.filter((item) => item.type === 'Click').forEach((item) => {
      const option = item.option as IClickOption
      option.position.x = Math.floor(option.position.x * currentConfig.screenWidth / iExportedMacro.config.screenWidth)
      option.position.y = Math.floor(option.position.y * currentConfig.screenHeight / iExportedMacro.config.screenHeight)
    })
  })

  return iExportedMacro.macroGroup
}
