import { FormioRefreshValue } from '@formio/angular';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-dynamic-form',
  templateUrl: './my-dynamic-form.component.html',
  styleUrls: ['./my-dynamic-form.component.css']
})
export class MyDynamicFormComponent implements OnInit, AfterViewInit {
  @ViewChild('json', {static: true}) jsonElement?: ElementRef;
  @ViewChild('code', {static: true}) codeElement?: ElementRef;
  public form: Object;
  public refreshForm: EventEmitter<FormioRefreshValue> = new EventEmitter();
  constructor() {
    this.form = {components: []};
  }
  ngOnInit(): void {
  }
  onSubmit(event){
    console.log(event.data);
  }
  onChange(event) {
    this.jsonElement.nativeElement.innerHTML = '';
    this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));
    this.refreshForm.emit({
      property: 'form',
      value: event.form
    });
  }

  onJsonSubmit(){
    console.log("json:"+this.jsonElement.nativeElement.innerHTML);
  }

  ngAfterViewInit() {
    
  }
}