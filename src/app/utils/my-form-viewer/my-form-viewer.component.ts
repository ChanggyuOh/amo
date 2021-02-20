import { Component, ViewChild, OnInit, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core';
import {myFormBuilder } from '../my-form-builder/myFormbuilder';
import { DomSanitizer, SafeUrl, SafeHtml } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { myTypeHelper } from '../my-form-builder/myTypeHelper';
import { P } from '@angular/cdk/keycodes';
import { Validators } from "@angular/forms";
import { FieldConfig, Validator } from "../my-form-builder/components/field.interface";
import { DynamicFormComponent } from "../my-form-builder/components/dynamic-form/dynamic-form.component";
import { FormDefinitionElement} from "../my-form-builder/my-form-builder.component";
import { RepositoryService } from "../../shared/repository.service";
import { Observable } from 'rxjs';
import { AnchorDirective } from './anchor.directive';
import { DynamicFormItem } from './dynamic-form-item';

@Component({
  selector: 'app-my-form-viewer',
  templateUrl: './my-form-viewer.component.html',
  styleUrls: ['./my-form-viewer.component.css']
})

export class MyFormViewerComponent implements OnInit {
  //@ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  @ViewChild(AnchorDirective, {static:true}) dynamicFormAnchor: AnchorDirective;
  @Input() currentDynamicForm: DynamicFormItem;
  
  public formList: FormDefinitionElement[];
  public pageSize:number = 20;
  currentForm: FormDefinitionElement = {id:0,name:'',description:'',definition:null};

  regConfig: FieldConfig[];
data = `[{
  "type": "input",
  "label": "Username",
  "inputType": "text",
  "name": "name",
  "validations": [{
          "name": "required",
          "validator": "Validators.required",
          "message": "Name Required"
      },
      {
        "name": "pattern",
        "validator": "Validators.pattern('^[a-zA-Z]+$')",
        "message": "Accept only text"
      }
  ]
},
{
  "type": "input",
  "label": "Email Address",
  "inputType": "email",
  "name": "email",
  "validations": [{
    "name": "required",
    "validator": "Validators.required",
    "message": "Email Required"
      },
      {
        "name": "pattern",
        "validator": "Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')",
          "message": "Invalid email"
      }
  ]
},
{
  "type": "input",
  "label": "Password",
  "inputType": "password",
  "name": "password",
  "validations": [{
    "name": "required",
    "validator": "Validators.required",
    "message": "Password Required"
  }]
},
{
  "type": "radiobutton",
  "label": "Gender",
  "name": "gender",
  "options": ["Male", "Female"],
  "value": "Male"
},
{
  "type": "date",
  "label": "DOB",
  "name": "dob",
  "validations": [{
    "name": "required",
    "validator": "Validators.required",
    "message": "Date of Birth Required"
  }]
},
{
  "type": "select",
  "label": "Country",
  "name": "country",
  "value": "UK",
  "options": ["India", "UAE", "UK", "US"]
},
{
  "type": "checkbox",
  "label": "Accept Terms",
  "name": "term",
  "value": true
},
{
  "type": "button",
  "label": "Save"
}
]`;
  getValidator(valr: string): any {
    if (valr == "Validators.required")
      return Validators.required;
    if (valr.startsWith("Validators.pattern(")){
      console.log('valr:'+valr);
      var pattern =`${valr.substring(valr.indexOf("('")+2, valr.indexOf("')"))}`;
      console.log(pattern);
      return Validators.pattern(pattern);
    }
      
  }
  constructor(private repoService: RepositoryService, 
    private sanitizer: DomSanitizer, 
    public viewContainerRef: ViewContainerRef,
    private cfResolver: ComponentFactoryResolver) { 
    var fl = this.getFormList(1);
    fl.subscribe((res:FormDefinitionElement[]) =>{
      this.formList = res;
      this.currentDynamicForm = new DynamicFormItem(DynamicFormComponent, this.getFormData(0));
    });
    
    var o = JSON.parse(this.data);
    var obj = this.buildObj(o);
    //this.regConfig = obj;
  }

  ngOnInit(): void {
  }

  loadComponent = (index:number) => {
    const formData = this.getFormData(index);
    const componentFactory = this.cfResolver.resolveComponentFactory(this.currentDynamicForm.component);
    const viewContainerRef = this.dynamicFormAnchor.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<DynamicFormComponent>(componentFactory);
    componentRef.instance.fields = formData;
  }

  buildObj = (obj:any):FieldConfig[] => {
    console.log("elm:"+obj);
    var arry =[];
    if (Array.isArray(obj)){
      obj.forEach(item => {
        let elm = item as FieldConfig;
        console.log("elm:"+elm);
        if (elm.validations){
          var validators = [];
          elm.validations.forEach(element => {
            let vali = element as Validator;
            validators.push({
              name: vali.name,
              validator: this.getValidator(vali.validator),
              message: vali.message
            });
          });
          arry.push({
            label: elm.label,
            name: elm.name,
            inputType: elm.inputType,
            type: elm.type,
            options: elm.options ?elm.options : null,
            collections: elm.collections ? elm.collections : null,
            validations: validators
          });
        }
        else {
          arry.push({
            label: elm.label,
            name: elm.name,
            inputType: elm.inputType,
            type: elm.type,
            options: elm.options ?elm.options : null,
            collections: elm.collections ? elm.collections : null
          });
        }
      });
    }
    return arry;
  }

  private getFormList = (pageIndex: number): Observable<Object> => {
    return this.repoService.getData(`forms/${pageIndex}/${this.pageSize}`, null);
  }

  submit(val){}

  onFormPreview = (index:number):void => {
    this.loadComponent(index);
  }

  getFormData = (index:number):any => {
    let currentForm = JSON.parse(this.formList[index].definition);
    for(var key in currentForm){
      if (currentForm.hasOwnProperty(key))
        if (Array.isArray(currentForm[key])){ // components
          var obj = this.buildObj(currentForm[key]);
          return obj;
        }
    }
    return null;
  }
}
