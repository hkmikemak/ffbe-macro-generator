import { CommonModule } from "@angular/common";
import { ExportComponent } from "../components/export";
import { FocusDirective } from "../directives/focusDirective";
import { KeysPipe } from "../pipes/keysPipe";
import { MacroGroupComponent } from "../components/macroGroup";
import { NewMacroGroupDialogComponent } from "../components/newMacroGroupDialog/index";
import { MacroItemComponent } from "../components/macroItem";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MacroItemEditorComponent } from "../components/macroItemEditor";
import { ClickEditorComponent } from "../actions/click/editor";
import { DelayEditorComponent } from "../actions/delay/editor";
import { ClickSlotEditorComponent } from "../actions/clickSlot/editor";
import { OpenSkillDrawerEditorComponent } from "../actions/openSkillDrawer/editor";
import { ScrollRowEditorComponent } from "../actions/scrollRow/editor";
import { ClickMultipleSlotsEditorComponent } from "../actions/clickMultipleSlots/editor";

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
  providers: [
  ],
})
export class MacroBuilderModule {

}
