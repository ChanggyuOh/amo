import { Component, OnInit, Inject } from '@angular/core';
import { MyFeedDialogData } from '../../_interface/myfeed.dialog.model';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatRadioChange } from '@angular/material/radio';
import { environment } from '../../../environments/environment';
export interface HashTag {
  name: string;
}
@Component({
  selector: 'app-candidate-dialog',
  templateUrl: './candidate-dialog.component.html',
  styleUrls: ['./candidate-dialog.component.css']
})
export class CandidateDialogComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public showBestPeople: boolean = false;

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
   constructor(
    public dialogRef: MatDialogRef<CandidateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MyFeedDialogData,
    private authService: SocialAuthService,
    private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    var user = localStorage.getItem('user');
    if (user != null)
    {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.loggedIn = true;
    }
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    if (this.data.hashTags)
      this.data.hashTags.split(',').forEach(name => this.hashTags.push({name}));

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
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
  public onFileComplete = (data: any) => {
    console.log(data); // We just print out data bubbled up from event emitter.
    this.data.imageUrl = environment.urlAddress+"/"+data.dbPath.replace("Resources\\","Resource/").replace(/\\/g,"/");
  }

}
