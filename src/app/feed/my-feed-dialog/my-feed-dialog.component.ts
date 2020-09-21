import { Component, OnInit, Inject } from '@angular/core';
import { MyFeedDialogData } from '../../_interface/myfeed.dialog.model';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-my-feed-dialog',
  templateUrl: './my-feed-dialog.component.html',
  styleUrls: ['./my-feed-dialog.component.css']
})
export class MyFeedDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MyFeedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MyFeedDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
