import { Component, ViewChild, OnInit } from '@angular/core';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FieldConfig, Validator } from "../my-form-builder/components/field.interface";
import { FormGroup, FormControl } from "@angular/forms"

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
  inflightData: FieldConfig = { name:'hello', label:'label', inputType:'string', options: null, collections: null, type:'inputtext', validations:null, value:"test"};
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

  constructor() {
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
      case 'Input Text': newItem.type = "inputtext";
        break;
      case 'Input File': newItem.type = "inputfile";
        break;
      case 'Input TextArea': newItem.type = "inputtextarea";
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

  onEntered = (enter): void => {
    console.log('ee', enter);
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
}
