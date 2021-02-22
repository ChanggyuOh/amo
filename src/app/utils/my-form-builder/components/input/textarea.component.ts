import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../field.interface";
@Component({
  selector: "app-textarea",
  template: `
<mat-form-field class="dynmaic-input-text-full-width" [formGroup]="group">
<mat-label>{{field.label}}</mat-label>
  <textarea matInput
            cdkTextareaAutosize
            [formControlName]="field.name" [placeholder]="field.label"
            #autosize="cdkTextareaAutosize"
            cdkAutosizeMinRows="1"
            cdkAutosizeMaxRows="5">
    </textarea>
</mat-form-field>
`,
  styles: [`
  .dynmaic-input-text-full-width {width:100%;}
  `]
})
export class MyTextAreaComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}