import * as clipboard from "clipboard-polyfill/build/clipboard-polyfill.promise";
import { merge } from "rxjs";
import { ALL_ACTIONS, IMacroAction, MacroConfigService } from "../..";
import { Component, OnInit } from "../../../../node_modules/@angular/core";
import { Macro } from "../../../memuMacro";
import { MacroGroupService } from "../../services/macroGroupService";

@Component({
  selector: "script-output",
  styleUrls: ["./index.css"],
  templateUrl: "./index.html",
})
export class OutputComponent implements OnInit {

  public macroScript: string;

  constructor(private macroGroupService: MacroGroupService, private macroConfigService: MacroConfigService) {  }

  public buildScript = () => {
    const macro = new Macro();
    const groups = this.macroGroupService.getValue();
    const config = this.macroConfigService.getValue();

    groups.filter((i) => i.repeat > 0).forEach((group) => {
      for (let i = 1; i <= group.repeat; i++) {
        group.items.forEach((item) => {
          macro.pipe(config, (ALL_ACTIONS[item.type] as IMacroAction).macroBuilder(item.option));
        });
      }
    });
    this.macroScript = macro.toString();
  }

  public ngOnInit() {
    merge(this.macroConfigService.observable, this.macroGroupService.observable).subscribe(() => {
      this.buildScript();
    });
  }

  public copyResultToClipboard = () => {
    clipboard.writeText(this.macroScript);
  }
}
