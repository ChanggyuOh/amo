import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { RtcSignalRService, IUser, UserConnection } from '../../shared/rtc-signalr.service';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.css']
})
export class VideoChatComponent implements OnInit {
  userName = '';
  public users: UserConnection[];
  @ViewChild('theVideo') video: ElementRef;
  joined = false;

  roomName = 'Test1';

  constructor(@Inject(DOCUMENT) private document: Document, public rtcService: RtcSignalRService,) {
    console.log(this.rtcService);
    this.rtcService.usersObservable
      .subscribe(users => {
        this.users = users;
      });
  }

  ngOnInit() {
  }

  connect() {
    this.rtcService.join(this.userName, this.roomName);
    this.joined = true;
  }

  trackByFn(user: IUser) {
    return user.connectionId;
  }

  public disconnect = () => {
    this.rtcService.hangUp();
    this.document.location.reload();
  }
}
  