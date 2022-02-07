import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MyLogService } from 'src/app/shared/log.service';
import { RtcSignalRService, IUser, UserConnection } from '../../shared/rtc-signalr.service';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.css']
})
export class VideoChatComponent implements OnInit, OnDestroy {
  userName = '';
  public users: UserConnection[];
  @ViewChild('theVideo') video: ElementRef;
  joined = false;

  roomName = 'Test1';

  constructor(@Inject(DOCUMENT) private document: Document, 
              public rtcService: RtcSignalRService,
              private router: Router,
              private route: ActivatedRoute,
              private console: MyLogService) {
    this.route.queryParams
      .subscribe((params) => {
        this.userName = params['username'];
        this.roomName = params['roomname'];
      }
    );
    this.connect();
  }

  ngOnInit() {
    console.clear();
    this.rtcService.usersObservable
    .subscribe(users => {
      this.users = users;
    });
  }

  ngOnDestroy() {
  }

  connect = async() => {
    this.console.log('user name:' + this.userName);
    this.console.log("room name:"+this.roomName); 
    await this.rtcService.join(this.userName, this.roomName);
    this.console.log('join finished','#bada55','#222');
    this.joined = true;
    this.console.log('getRoom started... ',null, 'green','yellow');
    await this.rtcService.getRooms();
    this.console.log('%c getRoom ended... ',null, 'blue','white');
  }

  trackByFn(user: IUser) {
    return user.connectionId;
  }

  public disconnect = () => {
    this.rtcService.leaveCurrentRoom();
    //this.rtcService.hangUp();
   // this.document.location.reload();
    this.router.navigate(['/video-chat-room']);
  }
}
  