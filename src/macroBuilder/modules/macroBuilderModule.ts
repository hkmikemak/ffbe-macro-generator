import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ClickEditorComponent } from "../actions/click/editor";
import { ClickMultipleSlotsEditorComponent } from "../actions/clickMultipleSlots/editor";
import { ClickSlotEditorComponent } from "../actions/clickSlot/editor";
import { DelayEditorComponent } from "../actions/delay/editor";
import { OpenSkillDrawerEditorComponent } from "../actions/openSkillDrawer/editor";
import { ScrollRowEditorComponent } from "../actions/scrollRow/editor";
import { ExportComponent } from "../components/export";
import { MacroGroupComponent } from "../components/macroGroup";
import { MacroItemComponent } from "../components/macroItem";
import { MacroItemEditorComponent } from "../components/macroItemEditor";
import { NewMacroGroupDialogComponent } from "../components/newMacroGroupDialog/index";
import { FocusDirective } from "../directives/focusDirective";
import { KeysPipe } from "../pipes/keysPipe";
import { MacroGroupService } from "../services/macroGroupService";

@NgModule({
  declarations: [
    ClickEditorComponent,
    ClickSlotEditorComponent,
    ClickMultipleSlotsEditorComponent,
    DelayEditorComponent,
    ExportComponent,
    FocusDirective,
    KeysPipe,
    MacroGroupComponent,
    MacroItemComponent,
    NewMacroGroupDialogComponent,
    MacroItemEditorComponent,
    OpenSkillDrawerEditorComponent,
    ScrollRowEditorComponent,
  ],
  entryComponents: [
    ClickEditorComponent,
    ClickSlotEditorComponent,
    ClickMultipleSlotsEditorComponent,
    DelayEditorComponent,
    ExportComponent,
    NewMacroGroupDialogComponent,
    MacroItemEditorComponent,
    OpenSkillDrawerEditorComponent,
    ScrollRowEditorComponent,
  ],
  exports: [
    ClickEditorComponent,
    ClickSlotEditorComponent,
    ClickMultipleSlotsEditorComponent,
    DelayEditorComponent,
    ExportComponent,
    FocusDirective,
    MacroGroupComponent,
    MacroItemComponent,
    NewMacroGroupDialogComponent,
    MacroItemEditorComponent,
    OpenSkillDrawerEditorComponent,
    ScrollRowEditorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
})
export class MacroBuilderModule {
public static forRoot(): ModuleWithProviders {
  return {
    ngModule: MacroBuilderModule,
    providers: [
      MacroGroupService,
    ],
  };
}
}
