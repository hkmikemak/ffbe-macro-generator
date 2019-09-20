import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { distinctUntilChanged } from "rxjs/operators";
import { IMacroAction, IMacroItem } from "../..";
import { IEditorComponent } from "../../interfaces/editorComponent";
import { ALL_ACTIONS } from "../../shared/actions";

@Component({
  templateUrl: "./index.html",
})
export class MacroItemEditorComponent implements OnInit {
  private option: any;

  @ViewChild("editorHost", { read: ViewContainerRef, static: true }) private editorHost: ViewContainerRef;
  public formControl: FormControl = new FormControl("", [Validators.required]);
  public formGroup: FormGroup = null;
  public actions: any;

  constructor(
    public activeModal: NgbActiveModal,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.actions = ALL_ACTIONS;
  }

  private createEditor() {
    if (this.formControl.value) {
      const macroAction = (this.actions[this.formControl.value] as IMacroAction);
      this.formGroup = macroAction.optionToFormGroup(this.option);
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(macroAction.editorComponent);

      this.editorHost.clear();

      const editorComponent = this.editorHost.createComponent(componentFactory);
      const editorInstance = editorComponent.instance as IEditorComponent;
      editorInstance.setFormGroup(this.formGroup);
    }
  }

  public ngOnInit(): void {
    this.formControl.valueChanges.pipe(distinctUntilChanged())
      .subscribe(() => {
        this.createEditor();
      });
  }

  public setOption(item: IMacroItem) {
    this.option = item.option;
    this.formControl.setValue(item.type);
    this.formControl.disable();
    this.createEditor();
  }

  public submit() {
    const macroAction = (this.actions[this.formControl.value] as IMacroAction);
    const option = macroAction.formGroupToOption(this.formGroup);
    this.activeModal.close({ option, type: this.formControl.value } as IMacroItem);
  }
}
