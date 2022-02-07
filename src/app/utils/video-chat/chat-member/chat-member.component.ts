import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyLogService } from 'src/app/shared/log.service';
import { RtcSignalRService, UserConnection } from 'src/app/shared/rtc-signalr.service';

@Component({
  selector: 'app-chat-member',
  templateUrl: './chat-member.component.html',
  styleUrls: ['./chat-member.component.css']
})
export class ChatMemberComponent implements OnInit, OnDestroy {
  @Input()
  user: UserConnection;
  userName: string;
  roomName: string;

  theVideo: HTMLVideoElement;
  @ViewChild('theVideo')
  set mainLocalVideo(el: ElementRef) {
    this.console.log('mainLocalVideo',el.nativeElement,'white','blue');
    this.theVideo = el.nativeElement;
    this.rtcService.getLatestUserList(this.userName, this.roomName);
  }
  constructor(public rtcService: RtcSignalRService, private console: MyLogService, private route: ActivatedRoute) { 
    this.route.queryParams
      .subscribe((params) => {
        this.userName = params['username'];
        this.roomName = params['roomname'];
      }
    ); 
    if (this.userName && this.roomName){
      this.rtcService.join(this.userName, this.roomName);
    }
  }

  ngOnDestroy(): void {
    this.console.log('chat-member>>ngOnDestroy()>>this.user',this.user,'orange','yellow');
    this.user.end();
  }
  ngOnInit(): void {
    this.console.log('ChatMemberComponent>>ngOnInit()',null,'green','yellow');
    
    this.user.streamObservable.subscribe(stream => {
      if (stream) {
        this.console.log('stream', stream,'green','yellow');
        this.console.log('this.user', this.user,'blue','yellow');
        if (this.user.isCurrentUser) {
          this.console.log("a user is the current user.",null,"white","orange");
          this.theVideo.srcObject = null;
          this.theVideo.srcObject = stream;
          this.theVideo.defaultMuted = true;
          this.theVideo.volume = 0;
          this.theVideo.muted = true;
        } else {
          this.theVideo.srcObject = stream;
        }
      }
    });
    navigator.getUserMedia({video: true},(stream) => {
      this.console.log('stream',stream, 'white','green');
      this.theVideo.srcObject = stream;
      this.user.streamSub.next(stream);
      
    }, (err) => this.console.log("err",err,'red','yellow'));  
  }
}
