import { Directive, ViewContainerRef } from '@angular/core'

@Directive({
  selector: '[editor-anchor]'
})
export class MacroItemEditorAnchorDirective {
  constructor (public viewContainerRef: ViewContainerRef) { }
}
