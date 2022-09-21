import { DragDropModule } from '@angular/cdk/drag-drop'
import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { GeneratorPackageComponent } from '..'
import { ClickEditorComponent } from '../actions/click/editor'
import { ClickButtonEditorComponent } from '../actions/clickButton/editor'
import { ClickMultipleSlotsEditorComponent } from '../actions/clickMultipleSlots/editor'
import { ClickSlotEditorComponent } from '../actions/clickSlot/editor'
import { DelayEditorComponent } from '../actions/delay/editor'
import { DragEditorComponent } from '../actions/drag/editor'
import { OpenSkillDrawerEditorComponent } from '../actions/openSkillDrawer/editor'
import { ScrollRowEditorComponent } from '../actions/scrollRow/editor'
import { ConfigEditorComponent } from '../components/configEditor'
import { ExportComponent } from '../components/export'
import { MacroEditorComponent } from '../components/macroEditor'
import { MacroGroupComponent } from '../components/macroGroup'
import { MacroItemComponent } from '../components/macroItem'
import { MacroItemEditorComponent } from '../components/macroItemEditor'
import { MacroItemEditorAnchorDirective } from '../components/macroItemEditorAnchor'
import { NewMacroGroupDialogComponent } from '../components/newMacroGroupDialog/index'
import { OutputComponent } from '../components/output'
import { FocusDirective } from '../directives/focusDirective'
import { KeysPipe } from '../pipes/keysPipe'
import { MacroConfigService } from '../services/macroConfigService'
import { MacroGroupService } from '../services/macroGroupService'

@NgModule({
  declarations: [
    ClickEditorComponent,
    ClickButtonEditorComponent,
    ClickMultipleSlotsEditorComponent,
    ClickSlotEditorComponent,
    ConfigEditorComponent,
    DelayEditorComponent,
    DragEditorComponent,
    ExportComponent,
    FocusDirective,
    GeneratorPackageComponent,
    KeysPipe,
    MacroEditorComponent,
    MacroGroupComponent,
    MacroItemComponent,
    MacroItemEditorAnchorDirective,
    MacroItemEditorComponent,
    NewMacroGroupDialogComponent,
    OpenSkillDrawerEditorComponent,
    OutputComponent,
    ScrollRowEditorComponent,
  ],
  entryComponents: [
    ClickEditorComponent,
    ClickButtonEditorComponent,
    ClickMultipleSlotsEditorComponent,
    ClickSlotEditorComponent,
    ConfigEditorComponent,
    DelayEditorComponent,
    DragEditorComponent,
    ExportComponent,
    GeneratorPackageComponent,
    MacroItemEditorComponent,
    NewMacroGroupDialogComponent,
    OpenSkillDrawerEditorComponent,
    ScrollRowEditorComponent,
  ],
  exports: [
    ClickEditorComponent,
    ClickButtonEditorComponent,
    ClickMultipleSlotsEditorComponent,
    ClickSlotEditorComponent,
    ConfigEditorComponent,
    DelayEditorComponent,
    DragEditorComponent,
    ExportComponent,
    FocusDirective,
    GeneratorPackageComponent,
    MacroEditorComponent,
    MacroGroupComponent,
    MacroItemComponent,
    MacroItemEditorComponent,
    NewMacroGroupDialogComponent,
    OpenSkillDrawerEditorComponent,
    OutputComponent,
    ScrollRowEditorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
})
export class MacroBuilderModule {
  public static forRoot (): ModuleWithProviders<MacroBuilderModule> {
    return {
      ngModule: MacroBuilderModule,
      providers: [MacroGroupService, MacroConfigService],
    }
  }
}
