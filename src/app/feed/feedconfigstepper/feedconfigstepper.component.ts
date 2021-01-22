import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import {MatStepper} from '@angular/material/stepper';
import {timer, Observable} from 'rxjs';
import {debounceTime, filter, skip, take} from 'rxjs/operators';
import { MyFeedDialogData } from '../../_interface/myfeed.dialog.model';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

export interface HashTag {
  name: string;
}
@Component({
  selector: 'app-feedconfigstepper',
  templateUrl: './feedconfigstepper.component.html',
  styleUrls: ['./feedconfigstepper.component.css']
})
export class FeedconfigstepperComponent implements AfterViewInit, OnInit {
  @Input() data: MyFeedDialogData;
  hashTags: HashTag[] = [
  ];

  public editorOptions = {
    toolbar: {
      container:
      [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        //[{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        //[{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        //[{ 'direction': 'rtl' }],                         // text direction

        //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        //[{ 'font': [] }],
        //[{ 'align': [] }],

        //['clean']                                    // remove formatting button
      ],
    }
   };
 
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private _bestPeople: any;
  // private _stepper2: MatStepper;
  // private _stepper3: MatStepper;
  public showBestPeople: boolean = false;
  // public showStepper2: boolean = false;
  // public showStepper3: boolean = false;
  public stepperData1: MyFeedDialogData;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    //});
    if (this.data.hashTags)
    this.data.hashTags.split(',').forEach(name => this.hashTags.push({name}));
  }

  @ViewChild('bestpeople')
  private set bestPeople(bp: any){
    this._bestPeople = bp;
  }
  private get bestPeople(): any{
    return this._bestPeople;
  }

  public ngAfterViewInit(): void {
    let observable: Observable<any> = timer(50);

    observable.subscribe(() => {
      //console.log('Setting selectedIndex to 2!');
      //this.stepper1.selectedIndex = 0;
    });
  }

  public radioChange = (event: MatRadioChange) => {
    console.log(event);
    switch(event.value)
    {
      case "1":
        this.showBestPeople = true;
        // this.showStepper2 = true;
        // this.showStepper3 = false;  
        break;
      case "2":
        this.showBestPeople = false;
        // this.showStepper2 = true;
        // this.showStepper3 = false;        
        break;
      case "3":
        this.showBestPeople = false;
        // this.showStepper2 = false;
        // this.showStepper3 = true;        
        break;
    }
  }
  public add = (event: MatChipInputEvent): void => {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.hashTags.push({name: value.trim()});
      this.data.hashTags = this.hashTags.map(tag => tag.name).join();
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  public remove = (hashTag: HashTag): void => {
    const index = this.hashTags.indexOf(hashTag);

    if (index >= 0) {
      this.hashTags.splice(index, 1);
      this.data.hashTags = this.hashTags.map(tag => tag.name).join();
    }
  }
}
