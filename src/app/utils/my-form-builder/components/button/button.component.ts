import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../field.interface";
@Component({
  selector: "app-button",
  template: `
<div class="demo-full-width margin-top" [formGroup]="group">
<button type="submit" mat-raised-button color="primary" (click)="handleClick($event)">{{field.label}}</button>
</div>
`,
  styles: []
})
export class ButtonComponent implements OnInit {
  @Output() public myButtonClickOutput = new EventEmitter<MouseEvent>();
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}

  public handleClick = (event: MouseEvent) => {
    this.myButtonClickOutput.emit(event);
  }
}