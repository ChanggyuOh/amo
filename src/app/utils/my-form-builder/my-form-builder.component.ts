import { Component, ViewChild, OnInit } from '@angular/core';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FieldConfig, Validator } from "../my-form-builder/components/field.interface";

@Component({
  selector: 'app-my-form-builder',
  templateUrl: './my-form-builder.component.html',
  styleUrls: ['./my-form-builder.component.css']
})
export class MyFormBuilderComponent implements OnInit {
  inProgressList: FieldConfig[] = [];
  inflightData: FieldConfig = { name:'hello', label:'label', inputType:'input', options: null, collections: null, type:'string', validations:null, value:"test"};
  toDoList = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi'
  ];
  constructor() {
  }

  drop(event: CdkDragDrop<string[]>) {
    // console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  onEntered(enter) {
    console.log('ee', enter);
  }

  ngOnInit(){}
}
