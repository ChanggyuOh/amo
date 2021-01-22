import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyFeedDialogComponent } from '../my-feed-dialog/my-feed-dialog.component';
import { MyFeedDialogData } from '../../_interface/myfeed.dialog.model';
import { RepositoryService } from '../../shared/repository.service';
import { SocialUser, SocialAuthService } from 'angularx-social-login';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BpmnDialogComponent } from '../bpmn-dialog/bpmn-dialog.component'
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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

  sub: any;

  constructor(public dialog: MatDialog, 
              private router: Router,
              private repoService: RepositoryService,
              private authService: SocialAuthService) {}
  ngOnInit(): void {
    var user = localStorage.getItem('user');

    if (user != null)
    {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.loggedIn = true;
    }
    else{
      this.router.navigate(['/feed/feeds']);
    }
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.repoService.getData('users/1/10',this.user)
      .pipe(
        map(response => response),
        tap(users => console.log("users array", users))    // users array [Object, Object, Object]
      )
      .subscribe((cards:MyFeedDialogData[]) => this.cards = cards);
    });

    this.repoService.getData('feeds/1/100',this.user)
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
      width: '1800px',
      height: '840px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      
      if (result != null)
      {
        //console.log(result);
        var savedData = this.saveFeed(result);

        savedData.subscribe((res:MyFeedDialogData) => {
          this.cards.splice(0,0,res);
          this.data = {
            id: 0,
            ownerId: 0,
            title: '',
            details: '',
            imageUrl:'',
            videoUrl:'',
            hashTags:''
          };
          this.router.navigate(['/debate/people-debate',res.id]);
        })    
      }
    });
  }

  private saveFeed = (feed: MyFeedDialogData): Observable<Object> => {
    if (feed.videoUrl)
      feed.videoUrl = feed.videoUrl.replace("/watch?v=","/embed/");

    return this.repoService.create('feeds', feed, this.user);
  }

  public goToPeopleDebatePage = (id: number) => {
    this.router.navigate(['/debate/people-debate',id]);
  }
}
