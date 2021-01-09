import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyFeedDialogComponent } from '../my-feed-dialog/my-feed-dialog.component';
import { MyFeedDialogData } from '../../_interface/myfeed.dialog.model';
import { RepositoryService } from '../../shared/repository.service';
import { SocialUser, SocialAuthService } from 'angularx-social-login';
import { map, tap } from 'rxjs/operators';
import { BpmnDialogComponent } from '../bpmn-dialog/bpmn-dialog.component'

@Component({
  selector: 'app-my-feed-list',
  templateUrl: './my-feed-list.component.html',
  styleUrls: ['./my-feed-list.component.css']
})
export class MyFeedListComponent implements OnInit {
  title: string;
  details: string;
  user: SocialUser;
  loggedIn: boolean;

  data: MyFeedDialogData = {
    id: 0,
    ownerId: 0,
    title: '',
    details: '',
    imageUrl: '',
    videoUrl: '',
    hashTags: ''
  };

  cards: MyFeedDialogData[] = [
  ];

  constructor(public dialog: MatDialog, 
              private repoService: RepositoryService,
              private authService: SocialAuthService) {}
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
      this.repoService.getData('feeds/1/10',this.user)
      .pipe(
        map(response => response),
        tap(users => console.log("users array", users))    // users array [Object, Object, Object]
      )
      .subscribe((cards:MyFeedDialogData[]) => this.cards = cards);
    });

    this.repoService.getData('feeds/1/10',this.user)
    .pipe(
      map(response => response),
      tap(users => console.log("users array", users))    // users array [Object, Object, Object]
    )
    .subscribe((cards:MyFeedDialogData[]) => this.cards = cards);
  }

  openBpmnDialog(): void {
    const dialogRef = this.dialog.open(BpmnDialogComponent, {
      width: '800px',
      height: '640px',
      //data: this.data
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MyFeedDialogComponent, {
      width: '800px',
      height: '640px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      
      if (result != null)
      {
        //console.log(result);
        this.saveFeed(result);

        this.data = {
          id: 0,
          ownerId: 0,
          title: '',
          details: '',
          imageUrl:'',
          videoUrl:'',
          hashTags:''
        };
      }
    });
  }

  private saveFeed = (feed: MyFeedDialogData) => {
    if (feed.videoUrl)
      feed.videoUrl = feed.videoUrl.replace("/watch?v=","/embed/");

    this.repoService.create('feeds', feed, this.user)
    .subscribe((res:MyFeedDialogData) => {
      this.cards.splice(0,0,res);
    })
  }
}
