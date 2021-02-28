import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RtcService } from 'src/app/shared/rtc.service';
import { Subscription } from 'rxjs';
import { ChatMessage, PeerData, SignalInfo, UserInfo } from 'src/app/_interface/signalR/peer-data.model';
import {SignalRService} from '../../shared/signal-r.service';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.css']
})
export class VideoChatComponent implements OnInit {
    @ViewChild('videoPlayer') videoPlayer: ElementRef;
    public subscriptions = new Subscription();
  
    private stream;
  
    public currentUser: string;
  
    public dataString: string;
  
    public userVideo: string;
  
    public messages: Array<ChatMessage>;
  
    public mediaError = (): void => { console.error(`Can't get user media`); };
  
    constructor(private rtcService: RtcService, private signalR: SignalRService) { }
  
    ngOnInit() {
      this.messages = new Array();
  
      this.subscriptions.add(this.signalR.newPeer$.subscribe((user: UserInfo) => {
        this.rtcService.newUser(user);
        this.signalR.sayHello(this.currentUser, user.connectionId);
      }));
  
      this.subscriptions.add(this.signalR.helloAnswer$.subscribe((user: UserInfo) => {
        this.rtcService.newUser(user);
      }));
  
      this.subscriptions.add(this.signalR.disconnectedPeer$.subscribe((user: UserInfo) => {
        this.rtcService.disconnectedUser(user);
      }));
  
      this.subscriptions.add(this.signalR.signal$.subscribe((signalData: SignalInfo) => {
        this.rtcService.signalPeer(signalData.user, signalData.signal, this.stream);
      }));
  
      this.subscriptions.add(this.rtcService.onSignalToSend$.subscribe((data: PeerData) => {
        this.signalR.sendSignalToUser(data.data, data.id);
      }));
  
      this.subscriptions.add(this.rtcService.onData$.subscribe((data: PeerData) => {
        this.messages = [...this.messages, { own: false, message: data.data }];
        console.log(`Data from user ${data.id}: ${data.data}`);
      }));
  
      this.subscriptions.add(this.rtcService.onStream$.subscribe((data: PeerData) => {
        this.userVideo = data.id;
        this.videoPlayer.nativeElement.srcObject = data.data;
        this.videoPlayer.nativeElement.load();
        this.videoPlayer.nativeElement.play();
      }));
    }
  
  
    public onUserSelected(userInfo: UserInfo) {
      const peer = this.rtcService.createPeer(this.stream, userInfo.connectionId, true);
      this.rtcService.currentPeer = peer;
    }
  
    public async saveUsername(): Promise<void> {
      try {
        await this.signalR.startConnection(this.currentUser);
        this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      } catch (error) {
        console.error(`Can't join room, error ${error}`);
      }
    }
  
    public sendMessage() {
      this.rtcService.sendMessage(this.dataString);
      this.messages = [...this.messages, { own: true, message: this.dataString }];
      this.dataString = null;
    }
    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }
  }
  