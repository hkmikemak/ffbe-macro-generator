import { ALL_ACTIONS, IMacroAction } from "../..";
import { Component, OnInit } from "../../../../node_modules/@angular/core";
import { Macro } from "../../../memuMacro";
import { MacroGroupService } from "../../services/macroGroupService";
const clipboard = require("clipboard-polyfill");

@Component({
  selector: "script-output",
  styleUrls: ["./index.css"],
  templateUrl: "./index.html",
})
export class OutputComponent implements OnInit {

  public macroScript: string;

  constructor(private macroGroupService: MacroGroupService) {  }

  public buildScript = () => {
    const macro = new Macro();
    const groups = this.macroGroupService.getValue();

    groups.filter((i) => i.repeat > 0).forEach((group) => {
      for (let i = 1; i <= group.repeat; i++) {
        group.items.forEach((item) => {
          macro.pipe((ALL_ACTIONS[item.type] as IMacroAction).macroBuilder(item.option));
        });
      }
    });
    this.macroScript = macro.toString();
  }

  public ngOnInit() {
    this.macroGroupService.observable.subscribe((groups) => {
      this.buildScript();
    });
  }

  public copyResultToClipboard = () => {
    clipboard.writeText(this.macroScript);
  }
}
