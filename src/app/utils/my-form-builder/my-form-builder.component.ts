import { Component, ViewChild, OnInit } from '@angular/core';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FieldConfig, Validator } from "../my-form-builder/components/field.interface";
import { FormGroup, FormControl } from "@angular/forms"
import { RepositoryService } from '../../shared/repository.service';
import { Observable } from 'rxjs';
import { P } from '@angular/cdk/keycodes';

export interface FormDefinitionElement {
  id: number;
  name: string;
  description: string;
  definition: string;
}

export interface iDraggable {
  icon: string,
  desc: string
}
@Component({
  selector: 'app-my-form-builder',
  templateUrl: './my-form-builder.component.html',
  styleUrls: ['./my-form-builder.component.css']
})
export class MyFormBuilderComponent implements OnInit {
  configList: FieldConfig[] = [];
  previewList: iDraggable[] = [];
  inflightData: FieldConfig = { name:'', label:'', inputType:'', options: null, collections: null, type:'', validations:null, value:""};
  toDoList: iDraggable[] = [
    { icon:'input', desc:'Input Text'},
    { icon:'file_upload', desc:'Input File'},
    { icon:'text_snippet', desc:'Input TextArea'},
    { icon:'check', desc:'Checkbox'},
    { icon:'add_box', desc:'Select Boxes'},
    { icon:'view_list', desc:'Select'},
    { icon:'radio_button_checked', desc:'Button'},
    { icon:'tag', desc:'Tag'},
    { icon:'date_range', desc:'Date/Time'},
    { icon:'content_paste', desc:'Content'},
    { icon:'padding', desc:'Field Set'},
    { icon:'crop_portrait', desc:'Panel'},
    { icon:'filter_center_focus', desc:'Well'},
    { icon:'view_column', desc:'Columns'},
  ];
  myGroup = new FormGroup({
    name: new FormControl(),
    type: new FormControl()
  });
  dataSource: string[];
  optionInput: string = '';
  validator: Validator = {name:'', validator:'', message:''};
  collectionItemInput: string = '';
  displayedColumns = ['option']
  public formList: FormDefinitionElement[];
  public pageSize:number = 20;
  currentForm: FormDefinitionElement = {id:0,name:'',description:'',definition:null};

  constructor(private repoService: RepositoryService) {
    this.dataSource = this.inflightData.options;
    var data = this.getFormList(1);
    data.subscribe((res:FormDefinitionElement[]) =>{
      this.formList = res;
      console.log(res);
    });
  }
  private getFormList = (pageIndex: number): Observable<Object> => {
    return this.repoService.getData(`forms/${pageIndex}/${this.pageSize}`, null);
  }

  drop = (event: CdkDragDrop<string[]>): void => {
    let itemReceived:any = event.previousContainer.data[event.previousIndex]
    this.addItem(itemReceived, event.previousIndex)

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  private addItem = (item:iDraggable, index: number):void =>{
    this.previewList.push({icon:item.icon, desc:item.desc});
    let newItem:FieldConfig = {label:"",type:"", name:"",inputType:"",options:[],collections:null,value:"",validations:[]};
    
    switch(item.desc)
    {
      case 'Input Text': newItem.type = "input";
        newItem.inputType ="text";
        break;
      case 'Input File': newItem.type = "inputfile";
        break;
      case 'Input TextArea': newItem.type = "inputtextarea";
        newItem.inputType ="text";
        break;
      case 'Checkbox': newItem.type = "checkbox";
        break;
      case 'Select Boxes': newItem.type = "radiogroup";
        break;
      case 'Select': newItem.type = "select";
        break;
      case 'Button': newItem.type = "button";
        break;
      case 'Tag': newItem.type = "tag";
        break;
      case 'Date/Time': newItem.type = "datetime";
        break;
      case 'Content': newItem.type = "content";
        break;
      case 'Field Set': newItem.type = "fieldset";
        break;
      case 'Panel': newItem.type = "panel";
        break;
      case 'Well': newItem.type = "well";
        break;
      case 'Columns': newItem.type = "columns";
        break;
    }
    this.configList.push(newItem);
  }

  dropPreview = (event: CdkDragDrop<string[]>):void => {
    moveItemInArray(this.previewList, event.previousIndex, event.currentIndex);
    moveItemInArray(this.configList, event.previousIndex, event.currentIndex);
  }

  onRemoveItem = (index:any): void =>{
    this.previewList.splice(index[0],1);
    this.configList.splice(index[0],1);
  }
  showProperties = (index:any): void => {
    console.log("selected index:"+index[0]);
    this.inflightData = this.configList[index[0]];
    console.log("selected tye:"+this.inflightData.type);
  }
  ngOnInit(){}
  addOption = ():void =>{
    if (this.inflightData.options == null)
      this.inflightData.options = [];

    console.log(this.optionInput);
    this.inflightData.options.push(this.optionInput);
  }
  removeOption = (index:number):void => {
    this.inflightData.options.splice(index,1)
  }
  addCollectionItem= ():void =>{
    if (this.inflightData.collections == null)
      this.inflightData.collections = [];

    console.log(this.collectionItemInput);
    this.inflightData.collections.push(this.collectionItemInput);
  }
  removeCollectionItem = (index:number):void => {
    this.inflightData.collections.splice(index,1)
  }
  addValidator = ():void =>{
    if (this.inflightData.validations == null)
      this.inflightData.validations = [];

    console.log(this.validator);
    this.inflightData.validations.push(this.validator);
  }
  removeValidator = (index:number):void => {
    this.inflightData.validations.splice(index,1)
  }
  onFormEdit = (index:number):void => {
    this.previewList = [];
    this.convertDataToPreviewList(this.formList[index].definition);
    this.currentForm = this.formList[index];
  }
  convertDataToPreviewList = (def:any): void => {
    this.configList = [];
    this.inflightData = { name:'', label:'', inputType:'', options: null, collections: null, type:'', validations:null, value:""};
    var obj = JSON.parse(def);
    for (var key in obj){
      if (obj.hasOwnProperty(key)){
        if (Array.isArray(obj[key])){ // components
          obj[key].forEach(element => {
            for (var k in element) {
              if (element.hasOwnProperty(k)){
                if (k == "type"){
                  switch(element[k])
                  {
                    case "input": this.previewList.push({ icon:'input', desc:'Input Text'});
                    let textItem:FieldConfig = {
                      label:element["label"],
                      type:element["type"], 
                      name:element["name"],
                      inputType:"text",
                      options:[],
                      collections:null,
                      value:element["value"],
                      validations:[]
                    };
                      this.configList.push(textItem);
                      break;
                    case "textfield": this.previewList.push({ icon:'input', desc:'Input Text'});
                    let textItem1:FieldConfig ={
                      label:element["label"],
                      type:element["type"], 
                      name:element["name"],
                      inputType:"text",
                      options:[],
                      collections:null,
                      value:element["value"],
                      validations:[]
                    };
                      this.configList.push(textItem1);
                      break;
                    case "url": this.previewList.push({ icon:'input', desc:'Input Text'});
                    let textItem2:FieldConfig = {
                      label:element["label"],
                      type:element["type"], 
                      name:element["name"],
                      inputType:"text",
                      options:[],
                      collections:null,
                      value:element["value"],
                      validations:[]
                    };
                      this.configList.push(textItem2);
                      break;
                    case "inputtextarea": this.previewList.push({ icon:'text_snippet', desc:'Input TextArea'});
                    let textItem3:FieldConfig = {
                      label:element["label"],
                      type:element["type"], 
                      name:element["name"],
                      inputType:"text",
                      options:[],
                      collections:null,
                      value:element["value"],
                      validations:[]
                    };
                      this.configList.push(textItem3);
                      break;
                      case "inputfile": this.previewList.push({ icon:'file_upload', desc:'Input File'});
                      break;
                    case "checkbox": this.previewList.push({ icon:'check', desc:'Checkbox'});
                      this.configList.push();
                      break;
                    case "radiogroup": this.previewList.push({ icon:'add_box', desc:'Select Boxes'});
                      break;
                    case "select": this.previewList.push({ icon:'view_list', desc:'Select'});
                      break;
                    case "button": this.previewList.push({ icon:'radio_button_checked', desc:'Button'});
                      break;
                    case "tag": this.previewList.push({ icon:'tag', desc:'Tag'});
                      break;
                    case "datetime": this.previewList.push({ icon:'date_range', desc:'Date/Time'});
                      break;
                    case "content": this.previewList.push({ icon:'content_paste', desc:'Content'});
                      break;
                    case "fieldset": this.previewList.push({ icon:'padding', desc:'Field Set'});
                      break;
                    case "panel": this.previewList.push({ icon:'crop_portrait', desc:'Panel'});
                      break;
                    case "well": this.previewList.push({ icon:'filter_center_focus', desc:'Well'});
                      break;
                    case "columns": this.previewList.push({ icon:'view_column', desc:'Columns'});
                      break;
                  }
                }
              };
            }
          });
        }
      }
    }
  }
  saveForm = ():void => {
    var def = ("{\"components\":"+JSON.stringify(this.configList)+"}").replace(/\"/g,"\\\"");
    console.log("raw:"+def);
    var data = `{	
      "id": ${this.currentForm != undefined ? this.currentForm.id : 0},
      "name": "${this.currentForm.name}",
      "description": "${this.currentForm.description}",
      "definition": "${def}" }`;
    console.log("sending data:"+data);
    var saved = this.saveFeed(data);
    saved.subscribe((res: any) => {
      console.log("response:" + res);
      document.getElementById("alarmmsg").innerHTML = "Saved...";
      setTimeout(function(){
        document.getElementById("alarmmsg").innerHTML = '';
      }, 3000);
    });
  }

  private saveFeed = (data: string): Observable<Object> => {
    console.log(data);
    console.log("formId:"+this.currentForm.id);

    if (this.currentForm.id > 0) {
      return this.repoService.update('forms',data, null);
    }
    else{
      return this.repoService.create('forms', data, null);
    }
  }
  func = ():void => {
    
  }
}
