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
  inProgressList: iDraggable[] = [ { icon:'input', desc:'Input Text'}];
  previewList: iDraggable[] = [];
  inflightData: FieldConfig = { name:'hello', label:'label', inputType:'input', options: null, collections: null, type:'string', validations:null, value:"test"};
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

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousContainer.data[event.previousIndex])
    console.log(this.inProgressList);
    let itemReceived:any = event.previousContainer.data[event.previousIndex]
    this.previewList.push({icon:itemReceived.icon, desc:itemReceived.desc});
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  dropPreview(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.previewList, event.previousIndex, event.currentIndex);
  }

  onEntered(enter) {
    console.log('ee', enter);
  }

  ngOnInit(){}
}
