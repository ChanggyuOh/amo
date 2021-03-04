import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RtcSignalRService, UserConnection } from 'src/app/shared/rtc-signalr.service';

@Component({
  selector: 'app-chat-member',
  templateUrl: './chat-member.component.html',
  styleUrls: ['./chat-member.component.css']
})
export class ChatMemberComponent implements OnInit {
  @Input()
  user: UserConnection;

  theVideo: HTMLVideoElement;
  @ViewChild('theVideo')
  set mainLocalVideo(el: ElementRef) {
    this.theVideo = el.nativeElement;
  }
  constructor(public rtcService: RtcSignalRService) { }

  ngOnInit(): void {
    this.user.streamObservable.subscribe(stream => {
      if (stream) {
        console.log("stream:"+stream);
        console.log("TargetUser:"+this.user)
        if (this.user.isCurrentUser) {
          this.theVideo.srcObject = stream;
          this.theVideo.defaultMuted = true;
          this.theVideo.volume = 0;
          this.theVideo.muted = true;
        } else {
          this.theVideo.srcObject = stream;
        }
      }
    });
  }
}
