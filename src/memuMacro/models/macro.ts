export class Macro {
  public currentFrame: number = 1000;
  public scripts: string[] = [];

  public toString = () => {
    this.scripts.push(`${this.currentFrame}--VINPUT--MOUSE:0:0`);
    return this.scripts.join("\n") + "\n";
  }

  public pipe(...actions: Array<(source: Macro) => Macro>): Macro {
    if (!actions || !actions.length) {
      return this;
    } else {
      return actions.reduce(
        (aggreatedScript, currentAction) => currentAction(aggreatedScript),
        this,
      );
    }
  }
}