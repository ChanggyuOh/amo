import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: 'dynamicFormAnchor',
})
export class AnchorDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}