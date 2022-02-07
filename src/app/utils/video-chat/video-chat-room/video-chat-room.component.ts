import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RtcSignalRService } from 'src/app/shared/rtc-signalr.service';

@Component({
  selector: 'app-video-chat-room',
  templateUrl: './video-chat-room.component.html',
  styleUrls: ['./video-chat-room.component.css']
})
export class VideoChatRoomComponent implements OnInit {
  rooms: string[];
  userName: string;
  roomName: string;
  displayedColumns: string[] = ['room','join'];

  constructor(public rtcService: RtcSignalRService, private router: Router, private route: ActivatedRoute) { 
    console.clear();
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params) => {
        this.userName = params['username'];
      }
    );
  }
  connect = () => {
    this.rtcService.leaveCurrentRoom();
    this.router.navigate(['/video-chat',],{ queryParams:{username:this.userName, roomname: this.roomName}})
  }
  
  joinAsync = async() => {
    if (!this.rtcService.connected){
      await this.rtcService.join(this.userName, "lobby");
    }
    this.rtcService.roomsRx.subscribe( r => {
      this.rooms = r;
      console.log("rooms:"+this.rooms);
    });
    this.rtcService.getRooms();
  }

  gotoChatroom= async (roomName:string) => {
    console.log("target room:"+roomName);
    await this.rtcService.leaveCurrentRoom();
    //await this.rtcService.join(this.userName, roomName);
    this.router.navigate(['/video-chat'],{ queryParams:{username:this.userName, roomname: roomName}})
  }
}
