import { Component, OnInit, Inject } from '@angular/core';
import { MyFeedDialogData } from '../../_interface/myfeed.dialog.model';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-my-feed-dialog',
  templateUrl: './my-feed-dialog.component.html',
  styleUrls: ['./my-feed-dialog.component.css']
})
export class MyFeedDialogComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
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
    public dialogRef: MatDialogRef<MyFeedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MyFeedDialogData,
    private authService: SocialAuthService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
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
  }

}
