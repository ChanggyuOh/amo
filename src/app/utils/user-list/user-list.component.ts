import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { RtcService } from 'src/app/shared/rtc.service';
import { UserInfo } from '../../_interface/signalR/peer-data.model';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Output() userSelected: EventEmitter<UserInfo> = new EventEmitter();

  public users$: Observable<Array<UserInfo>>;


  constructor(private rtcService: RtcService) { }

  ngOnInit() {
    this.users$ = this.rtcService.users$;
  }

  public userClicked(user: UserInfo) {
    this.userSelected.emit(user);
  }

}
