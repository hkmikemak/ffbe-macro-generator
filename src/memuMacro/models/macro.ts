import { MacroConfig } from '../interfaces/config'

export class Macro {
  public currentFrame: number = 500;
  public scripts: string[] = [];

  public toString = (config: MacroConfig) => {
    if (config.mode === 'Nox') {
      this.scripts.push(`0ScRiPtSePaRaToR${config.screenWidth}|${config.screenHeight}|MULTI:0:6ScRiPtSePaRaToR${this.currentFrame}`)
    } else if (config.mode === 'MEmu') {
      this.scripts.push(`${this.currentFrame}--VINPUT--MOUSE:0:0`)
    }

    return this.scripts.join('\n') + '\n'
  }

  public pipe (config: MacroConfig, ...actions: ((source: Macro, config: MacroConfig) => Macro)[]): Macro {
    if (!actions || !actions.length) {
      return this
    } else {
      return actions.reduce(
        (aggreatedScript, currentAction) => currentAction(aggreatedScript, config),
        this
      )
    }
  }
}
