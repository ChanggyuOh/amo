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
  htmlElementsList: iDraggable[] = [
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
  ngOnInit(){

  }

  // get data from api server
  private getFormList = (pageIndex: number): Observable<Object> => {
    return this.repoService.getData(`forms/${pageIndex}/${this.pageSize}`, null);
  }
  // when one of savied form edit button clicked in Forms panel
  onFormEdit = (index:number):void => {
    this.previewList = [];
    this.convertDataToPreviewList(this.formList[index].definition);
    this.currentForm = this.formList[index];
  }

  // convert saved form data to previewList and bind it to configList
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
                      let checkboxItem:FieldConfig = {
                        label:element["label"],
                        type:element["type"], 
                        name:element["name"],
                        inputType:"checkbox",
                        options:[],
                        collections:null,
                        value:element["value"],
                        validations:[]
                      };
                      this.configList.push(checkboxItem);
                      break;
                    case "radiogroup": this.previewList.push({ icon:'add_box', desc:'Select Boxes'});
                      break;
                    case "select": this.previewList.push({ icon:'view_list', desc:'Select'});
                      let selectItem:FieldConfig = {
                        label:element["label"],
                        type:element["type"], 
                        name:element["name"],
                        inputType:"checkbox",
                        options:element["options"],
                        collections:null,
                        value:element["value"],
                        validations:[]
                      };
                      this.configList.push(selectItem);
                      break;
                    case "button": this.previewList.push({ icon:'radio_button_checked', desc:'Button'});
                      break;
                    case "tag": this.previewList.push({ icon:'tag', desc:'Tag'});
                      break;
                    case "date": this.previewList.push({ icon:'date_range', desc:'Date/Time'});
                      let datetimeItem:FieldConfig = {
                        label:element["label"],
                        type:element["type"], 
                        name:element["name"],
                        inputType:"date",
                        options:[],
                        collections:null,
                        value:element["value"],
                        validations:[]
                      };
                      this.configList.push(datetimeItem);
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

  // drag and drop
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

  // drage and drop between htmlElementList and previewList
  dropPreview = (event: CdkDragDrop<string[]>):void => {
    moveItemInArray(this.previewList, event.previousIndex, event.currentIndex);
    moveItemInArray(this.configList, event.previousIndex, event.currentIndex);
  }

  // for dropped htmlelment, create form element defintion to configList
  private addItem = (item:iDraggable, index: number):void =>{
    this.previewList.push({icon:item.icon, desc:item.desc});
    let newItem:FieldConfig = {label:"",type:"", name:"",inputType:"",options:[],collections:null,value:"",validations:[]};
    
    switch(item.desc)
    {
      case 'Input Text': newItem.type = "input";
        newItem.inputType ="text";
        break;
      case 'Input File': newItem.type = "inputfile";
        newItem.inputType ="inputfile";
        break;
      case 'Input TextArea': newItem.type = "inputtextarea";
        newItem.inputType ="textarea";
        break;
      case 'Checkbox': newItem.type = "checkbox";
        newItem.inputType ="checkbox";
        break;
      case 'Select Boxes': newItem.type = "radiogroup";
        newItem.inputType ="radiogroup";
        break;
      case 'Select': newItem.type = "select";
        newItem.inputType ="select";
        break;
      case 'Button': newItem.type = "button";
        newItem.inputType ="button";
        break;
      case 'Tag': newItem.type = "tag";
        newItem.inputType ="tag";
        break;
      case 'Date/Time': newItem.type = "date";
        newItem.inputType ="date";
        break;
      case 'Content': newItem.type = "content";
        newItem.inputType ="content";
        break;
      case 'Field Set': newItem.type = "fieldset";
        newItem.inputType ="fieldset";
        break;
      case 'Panel': newItem.type = "panel";
        newItem.inputType ="panel";
        break;
      case 'Well': newItem.type = "well";
        newItem.inputType ="well";
        break;
      case 'Columns': newItem.type = "columns";
        newItem.inputType ="columns";
        break;
    }
    this.configList.push(newItem);
  }

  // remove item in the previewList and configList when 'X' button next to item clicked
  onRemoveItem = (index:any): void =>{
    this.previewList.splice(index[0],1);
    this.configList.splice(index[0],1);
  }

  // when click on ui item in the drag panel, show its config data in property window
  onPropertiesBind = (index:any): void => {
    console.log("index:"+index[0]);
    console.log("form data:"+this.configList[index[0]]);
    this.inflightData = this.configList[index[0]];
    console.log("inflight data:"+this.inflightData);
  }
  
  // when add option button clicked in property window
  addOption = ():void =>{
    if (this.inflightData.options == null)
      this.inflightData.options = [];

    this.inflightData.options.push(this.optionInput);
    console.log(this.inflightData.options);
  }

  // when remove option button clicked in the property window
  removeOption = (index:number):void => {
    this.inflightData.options.splice(index,1)
  }

  // when add collection item button clicked in the property window
  addCollectionItem= ():void =>{
    if (this.inflightData.collections == null)
      this.inflightData.collections = [];

    console.log(this.collectionItemInput);
    this.inflightData.collections.push(this.collectionItemInput);
  }

  // when remove collection item button clicked in the property window
  removeCollectionItem = (index:number):void => {
    this.inflightData.collections.splice(index,1)
  }

  // when add validator item button clicked in the property window
  addValidator = ():void =>{
    if (this.inflightData.validations == null)
      this.inflightData.validations = [];

    console.log(this.validator);
    this.inflightData.validations.push(this.validator);
  }

  // when remove validator item button clicked in the property window
  removeValidator = (index:number):void => {
    this.inflightData.validations.splice(index,1)
  }

  // save editted form data
  saveForm = ():void => {
    var def = ("{\"components\":"+JSON.stringify(this.configList)+"}").replace(/\"/g,"\\\"");
    console.log("raw:"+def);
    var data = `{	
      "id": ${this.currentForm != undefined ? this.currentForm.id : 0},
      "name": "${this.currentForm.name}",
      "description": "${this.currentForm.description}",
      "definition": "${def}" }`;
    console.log("sending data:"+data);
    var saved = this.uploadFormToApiServer(data);
    saved.subscribe((res: any) => {
      console.log("response:" + res);
      document.getElementById("alarmmsg").innerHTML = "Saved...";
      setTimeout(function(){
        document.getElementById("alarmmsg").innerHTML = '';
      }, 3000);
    });
  }

  // save to API server
  private uploadFormToApiServer = (data: string): Observable<Object> => {
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
