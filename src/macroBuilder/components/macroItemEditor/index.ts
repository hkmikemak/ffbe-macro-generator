import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IMacroAction, IMacroItem } from "../..";
import { ALL_ACTIONS } from "../../shared/actions";
import { distinctUntilChanged } from 'rxjs/operators';
import { IEditorComponent } from "../../interfaces/editorComponent";

@Component({
  templateUrl: "./index.html",
})
export class MacroItemEditorComponent implements OnInit {
  public formControl: FormControl = new FormControl("", [Validators.required]);
  public formGroup: FormGroup = null;
  public actions: any;
  private option: any;

  @ViewChild('editorHost', { read: ViewContainerRef }) private editorHost: ViewContainerRef;

  constructor(
    public activeModal: NgbActiveModal,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.actions = ALL_ACTIONS;
  }

  ngOnInit(): void {
    this.formControl.valueChanges.pipe(distinctUntilChanged())
      .subscribe(() => {
        this.createEditor();
      });
  }

  private createEditor() {
    if (this.formControl.value) {
      let macroAction = (<IMacroAction>this.actions[this.formControl.value]);
      this.formGroup = macroAction.optionToFormGroup(this.option);
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(macroAction.editorComponent);

      this.editorHost.clear();

      let editorComponent = this.editorHost.createComponent(componentFactory);
      let editorInstance = <IEditorComponent>editorComponent.instance;
      editorInstance.setFormGroup(this.formGroup);
    }
  }

  public setOption(item: IMacroItem) {
    this.option = item.option;
    this.formControl.setValue(item.type);
    this.formControl.disable();
    this.createEditor();
  }

  public submit() {
    let macroAction = (<IMacroAction>this.actions[this.formControl.value]);
    let option = macroAction.formGroupToOption(this.formGroup);
    this.activeModal.close({ option, type: this.formControl.value } as IMacroItem);
  }
}
