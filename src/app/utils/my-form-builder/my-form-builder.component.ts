import { Component, ViewChild, OnInit } from '@angular/core';
import {myFormBuilder } from './myFormbuilder';
import { DomSanitizer, SafeUrl, SafeHtml } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { myTypeHelper } from './myTypeHelper';
import { P } from '@angular/cdk/keycodes';
import { Validators } from "@angular/forms";
import { FieldConfig, Validator } from "./components/field.interface";
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";

export interface HtmlInput {
  key: string;
  tooltip: string;
  style: string;
  type: string;
  class: string;
  label: string;
  placeholder: string;
}

@Component({
  selector: 'app-my-form-builder',
  templateUrl: './my-form-builder.component.html',
  styleUrls: ['./my-form-builder.component.css']
})
export class MyFormBuilderComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  regConfig: FieldConfig[];
//   regConfig: FieldConfig[] = [{
//     type: "input",
//     label: "Username",
//     inputType: "text",
//     name: "name",
//     validations: [{
//             name: "required",
//             validator: Validators.required,
//             message: "Name Required"
//         },
//         {
//             name: "pattern",
//             validator: Validators.pattern("^[a-zA-Z]+$"),
//             message: "Accept only text"
//         }
//     ]
// },
// {
//     type: "input",
//     label: "Email Address",
//     inputType: "email",
//     name: "email",
//     validations: [{
//             name: "required",
//             validator: Validators.required,
//             message: "Email Required"
//         },
//         {
//             name: "pattern",
//             validator: Validators.pattern(
//                 "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
//             ),
//             message: "Invalid email"
//         }
//     ]
// },
// {
//     type: "input",
//     label: "Password",
//     inputType: "password",
//     name: "password",
//     validations: [{
//         name: "required",
//         validator: Validators.required,
//         message: "Password Required"
//     }]
// },
// {
//     type: "radiobutton",
//     label: "Gender",
//     name: "gender",
//     options: ["Male", "Female"],
//     value: "Male"
// },
// {
//     type: "date",
//     label: "DOB",
//     name: "dob",
//     validations: [{
//         name: "required",
//         validator: Validators.required,
//         message: "Date of Birth Required"
//     }]
// },
// {
//     type: "select",
//     label: "Country",
//     name: "country",
//     value: "UK",
//     options: ["India", "UAE", "UK", "US"]
// },
// {
//     type: "checkbox",
//     label: "Accept Terms",
//     name: "term",
//     value: true
// },
// {
//     type: "button",
//     label: "Save"
// }
// ];
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
  "type": "fileupload",
  "label": "fileupload",
  "name": "fileupload"
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
  constructor(private sanitizer: DomSanitizer) { 
    var o = JSON.parse(this.data);
    var obj =[];
    if (Array.isArray(o)){
      o.forEach(item => {
        let elm = item as FieldConfig;
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
          obj.push({
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
          obj.push({
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
    this.regConfig = obj;
  }

  ngOnInit(): void {
  }
  submit(val){}
  // recursiveScan = (obj) =>{
  //   for (var property in obj) {
  //     if (Array.isArray(obj[property])){
  //       obj[property].forEach(item => this.recursiveScan(item));
  //     }
  //     if (obj.hasOwnProperty("validator")) {
  //         obj["validator"] = eval(obj["validator"]);
  //     }
  //   }
  // }
}
