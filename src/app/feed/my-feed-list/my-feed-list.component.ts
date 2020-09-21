import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyFeedDialogComponent } from '../my-feed-dialog/my-feed-dialog.component';
import { MyFeedDialogData } from '../../_interface/myfeed.dialog.model'
@Component({
  selector: 'app-my-feed-list',
  templateUrl: './my-feed-list.component.html',
  styleUrls: ['./my-feed-list.component.css']
})
export class MyFeedListComponent implements OnInit {
  title: string;
  details: string;
  data: MyFeedDialogData = {
    title: '',
    details: '',
    buttonText: 'Button',
    img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
  };

  cards = [
    {
      title: 'Card Title 1',
      details: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
  ];

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(MyFeedDialogComponent, {
      width: '800px',
      height: '450px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      if (result != null)
      {
        console.log(result);
        this.cards.push(result);
      }
    });
  }

  ngOnInit(): void {
  }

}
