import { AfterViewInit, Directive, ElementRef } from '@angular/core'

@Directive({
  selector: '[setFocus]'
})
export class FocusDirective implements AfterViewInit {
  constructor (private element: ElementRef) { }

  public ngAfterViewInit () {
    this.element.nativeElement.focus()
  }
}
