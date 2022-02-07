import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import 'webrtc-adapter';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MyLogService } from './log.service';

export interface IUser {
  userName: string;
  connectionId: string;
}

export class UserConnection {
  user: IUser;
  isCurrentUser: boolean;
  rtcConnection: RTCPeerConnection;
  streamSub: BehaviorSubject<MediaStream>;
  streamObservable: Observable<MediaStream>;
  creatingOffer = false;
  creatingAnswer = false;

  constructor(user: IUser, isCurrentUser: boolean, rtcConnection: RTCPeerConnection) {
    this.user = user;
    this.isCurrentUser = isCurrentUser;
    this.rtcConnection = rtcConnection;
    this.streamSub = new BehaviorSubject<MediaStream>(undefined);
    this.streamObservable = this.streamSub.asObservable();
  }

  setStream = (stream: MediaStream) => {
    this.streamSub.next(stream);
  }

  end = () => {
    if (this.rtcConnection) {
      this.rtcConnection.close();
    }
    if (this.streamSub.getValue()) {
      this.setStream(undefined);
    }
  }
}

export interface IOtherUserMedia {
  otherUserConnectionId: string;
  track: RTCTrackEvent;
}

enum SignalType {
  newIceCandidate,
  videoOffer,
  videoAnswer
}

interface ISignal {
  type: SignalType;
  sdp?: RTCSessionDescription;
  candidate?: RTCIceCandidate;
}

@Injectable()
export class RtcSignalRService {
  private _hubConnection: signalR.HubConnection;
  private _connections: { [index: string]: UserConnection } = {};

  private connSub = new BehaviorSubject<boolean>(false);
  public connObservable = this.connSub.asObservable();
  private usersSub = new BehaviorSubject<UserConnection[]>(undefined);
  public roomsRx = new BehaviorSubject<string[]>([]);
  public usersObservable = this.usersSub.asObservable();

  public currentConnectionId: string;
  public currentRoomName: string;
  public currentMediaStream: MediaStream;
  public currentIceServers: RTCIceServer[];
  public connected = false;

  private reset = () => {
    this.connected = false;
    this.connSub.next(false);
    this.roomsRx.next([]);
    this.usersSub.next(undefined);
  }

  constructor(private con: MyLogService) {
    //this.initHubConnection();
  }
  makeConnectionAsync = async () => {
    try {
      this.con.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
      await this._hubConnection.start();
      const connectionId = await this._hubConnection.invoke('GetConnectionId');
      this.con.log("RtcSignalRService>>constructor>>connectionId:"+connectionId);

      this.currentConnectionId = connectionId;
      this.connected = true;
      this.con.log("%c RtcSignalRService>>constructor>>before closeAllVideoCalls()", 'background: #222; color: #bada55');
      this.closeAllVideoCalls();
      this.con.log("%c RtcSignalRService>>constructor>>after closeAllVideoCalls()", 'background: #222; color: #bada55');
        this.connSub.next(true);
    } catch (error) {
      this.con.log(error,'red','yellow');
    }
  }

  initHubConnection = async () => {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.urlAddress + '/sgr/rtc')
      .configureLogging(signalR.LogLevel.Debug)
      .build();

    await this.makeConnectionAsync();

    this._hubConnection
      .onclose((err) => {
        if (err != undefined)
          this.con.log("RtcSignalRService>>contructor>>_hubConnection:"+err,'red','yellow');
        //this.con.log(err, 'background: #222; color: #bada55');
        this.connected = false;
        this.reset();
      });

    this._hubConnection
        .on('callToUserList', async (roomName: string, users: IUser[]) => {
          this.con.log('server hub response on callToUserList callback function.',null,'white','blue');
        if (this.currentRoomName === roomName) {
          users.forEach(user => {
            if (this._connections[user.connectionId] === undefined
                && user.connectionId !== this.currentConnectionId) {
              this.initiateOffer(user);
            }
          });

          await this.updateUserList(users);
        }
      });

    this._hubConnection
        .on('updateUserList', async (roomName: string, users: IUser[]) => {
          this.con.log('server hub response on updateUserList callback function.',null,'white','blue');
        if (this.currentRoomName === roomName) {
          Object.keys(this._connections)
            .forEach(key => {
              if (!users.find(user => user.connectionId === key)) {
                this.closeVideoCall(key);
              }
            });
          await this.updateUserList(users);
        }
      });

    this._hubConnection
      .on('receiveSignal', async (user: string, signal: string) => {
        await this.newSignal(user, signal);
      });

    this._hubConnection
      .on('receiveUpdatedRooms', async (rooms: string[]) => {
        this.roomsRx.next(rooms);
      });
  }

  private updateUserList = async (users: IUser[]): Promise<void> => {
    this.con.log("RtcSignalRService>>updateUserList:"+users);
    const iceServers = await this.getIceServers();

    users.forEach(async user => {
      const connection = this.getConnection(user.connectionId, iceServers);
      this.con.log("RtcSignalRService>>updateUserList>>user's connection:"+connection);

      if (connection.user.userName !== user.userName) {
        connection.user.userName = user.userName;
      }
      if (connection.isCurrentUser && connection.streamSub.getValue() === undefined) {
        const stream = await this.getUserMediaInternal();

        if (connection.streamSub.getValue() === undefined) {
          connection.streamSub.next(stream);
        }
      }
    });
    this.usersSub.next(Object.values(this._connections));
  }

  public join = async (userName: string, room: string) => {
    this.con.log("RtcSignalRService>>join:connected:"+this.connected);
    if (!this.connected) {
      //this.reset();
      await this.initHubConnection();      
    }
    this.closeAllVideoCalls();
    

    this._connections[this.currentConnectionId] =
      new UserConnection({ userName: userName, connectionId: this.currentConnectionId }, true, undefined);
    this.currentRoomName = room;
    this._hubConnection
      .invoke('Join', userName, room);
  }

  public getLatestUserList = async (userName: string, room: string) => {
    await this._hubConnection
      .invoke("GetLatestUserList", userName, room);
  }

  public hangUp = async() => {
    this.con.log("RtcSignalRService>>hangUp() is called.");
    this.closeVideoCall(this.currentConnectionId);
    await this._hubConnection.invoke('hangUp');
    await this._hubConnection.stop();
  }
  public leaveCurrentRoom = async() => {
    this.con.log("RtcSignalRService>>leaveCurrentRoom() is called.");
    this.closeVideoCall(this.currentConnectionId);
    await this._hubConnection.invoke('leaveCurrentRoom');
  }

  private getUserMediaInternal = async (): Promise<MediaStream> =>{
    this.con.log("RtcSignalRService>>getUserMediaInternal>>this.currentMediaStream:"+this.currentMediaStream);
    if (this.currentMediaStream) {
      return this.currentMediaStream;
    }

    try {
      return await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
    } catch (error) {
      this.con.log('Failed to get hardware access'+ error,'red','yellow');
    }
  }

  private getIceServers = async (): Promise<RTCIceServer[]> => {
    this.con.log("RtcSignalRService>>getIceServers>>this.currentIceServers:"+this.currentIceServers);
    if (this.currentIceServers) {
      return this.currentIceServers;
    }

    try {
      return await this._hubConnection
        .invoke('GetIceServers');
    } catch (error) {
      this.con.log('GetIceServers error: '+ error,'red','yellow');
    }
  }

  private initiateOffer = async (acceptingUser: IUser) => {
    this.con.log("RtcSignalRService>>initiateOffer>>acceptingUser:"+acceptingUser);
    const partnerClientId = acceptingUser.connectionId;

    this.con.log('Initiate offer to ' + acceptingUser.userName);

    if (this._connections[partnerClientId]) {
      this.con.log('Cannot initiate an offer with existing partner.');
      return;
    }

    const iceServers = await this.getIceServers();
    this.con.log("patnerClientId:"+partnerClientId);
    this.con.log("iceServers:"+iceServers);
    const connection = this.getConnection(partnerClientId, iceServers);
    const localStream = await this.getUserMediaInternal();
    localStream.getTracks().forEach(track => connection.rtcConnection.addTrack(track, localStream));
  }

  private sendSignal = async (message: ISignal, partnerClientId: string) => {
    this.con.log("RtcSignalRService>>sendSignal>>message:"+message);
    this.con.log("RtcSignalRService>>sendSignal>>partnerClientId:"+partnerClientId);

    try {
      await this._hubConnection.invoke('SendSignal', JSON.stringify(message), partnerClientId);
    }catch (error) {
      this.con.log("rtc-signalr SendSignal Error:"+ error);
    }
  }

  private newSignal = async (user: string, data: string) => {
    this.con.log("RtcSignalRService>>newSignal>>user:"+user);
    this.con.log("RtcSignalRService>>newSignal>>data:"+data);
    try {
        var us = JSON.parse(user) as IUser;

        const signal: ISignal = JSON.parse(data);
        var connectionId = us["connectionId"];
        this.con.log(us["connectionId"]);

        this.con.log('WebRTC: received signal');

        if (signal.type == SignalType.newIceCandidate) {
            await this.receivedNewIceCandidate(connectionId, signal.candidate);
        } else if (signal.type == SignalType.videoOffer) {
            await this.receivedVideoOffer(connectionId, signal.sdp);
        } else if (signal.type == SignalType.videoAnswer) {
            await this.receivedVideoAnswer(connectionId, signal.sdp);
        }
    } catch (error) {
        this.con.log(error);
    }
    
  }

  public getRooms = async () => {
    try{
      this._hubConnection
      .invoke('getRoomsAsync');
    } catch(error) {
      this.con.log('getRooms() has error:'+error,'red','yellow');
    }
    
  }

  private receivedNewIceCandidate = async (partnerClientId: string, candidate: RTCIceCandidate) => {
    this.con.log('RtcSignalRService>>receivedNewIceCandidate>>Adding received ICE candidate: ' + JSON.stringify(candidate));

    try {
      const iceServers = await this.getIceServers();
      const connection = this.getConnection(partnerClientId, iceServers);
      await connection.rtcConnection.addIceCandidate(candidate);
    } catch (error) {
      this.con.log('Error adding ICE candidate:'+error,'red','yellow');
    }
  }

  private receivedVideoOffer = async (partnerClientId: string, sdp: RTCSessionDescription) => {
    this.con.log('RtcSignalRService>>receivedVideoOffer>>Starting to accept invitation from ' + partnerClientId);

    const desc = new RTCSessionDescription(sdp);
    const iceServers = await this.getIceServers();
    const connection = this.getConnection(partnerClientId, iceServers);

    if (connection.creatingAnswer) {
      this.con.log('Second answer not created.',null,'orange','blue');

      return;
    }
    connection.creatingAnswer = true;

    try {
      this.con.log('setRemoteDescription');
      await connection.rtcConnection.setRemoteDescription(desc);
      this.con.log('createAnswer');
      const senders = connection.rtcConnection.getSenders();
      if (!senders || senders.length === 0) {
        this.con.log('AddSenders needed');
        const localStream = await this.getUserMediaInternal();
        localStream.getTracks().forEach(track => connection.rtcConnection.addTrack(track, localStream));
      }
      const answer = await connection.rtcConnection.createAnswer();
      this.con.log('setLocalDescription'+ answer);
      await connection.rtcConnection.setLocalDescription(answer);
      await this.sendSignal({
        type: SignalType.videoAnswer,
        sdp: connection.rtcConnection.localDescription
      }, partnerClientId);
    } catch (error) {
      this.con.log('Error in receivedVideoOffer:'+ error);
    }

    connection.creatingAnswer = false;
  }

  private receivedVideoAnswer = async (partnerClientId: string, sdp: RTCSessionDescription) => {
    this.con.log('RtcSignalRService>>receivedVideoAnswer>>partnerClientId:' + partnerClientId);
    this.con.log('RtcSignalRService>>receivedVideoAnswer>>sdp:' + sdp);
    this.con.log('Call recipient has accepted our call');

    try {
      const iceServers = await this.getIceServers();
      const connection = this.getConnection(partnerClientId, iceServers);
      await connection.rtcConnection.setRemoteDescription(sdp);
    } catch (error) {
      this.con.log('Error in receivedVideoAnswer:'+ error);
    }
  }

  private getConnection = (partnerClientId: string, iceServers: RTCIceServer[]): UserConnection => {
    this.con.log('RtcSignalRService>>getConnection>>partnerClientId:' + partnerClientId);
    this.con.log('RtcSignalRService>>getConnection>>iceServers:' + iceServers);
    const connection = this._connections[partnerClientId] || this.createConnection(partnerClientId, iceServers);
    return connection;
  }

  private createConnection = (partnerClientId: string, iceServers: RTCIceServer[]): UserConnection => {
    this.con.log('RtcSignalRService>>createConnection>>partnerClientId:' + partnerClientId);
    this.con.log('RtcSignalRService>>createConnection>>iceServers:' + iceServers);
    this.con.log('WebRTC: creating connection...');

    if (this._connections[partnerClientId]) {
      this.closeVideoCall(partnerClientId);
    }

    const connection = new RTCPeerConnection({ iceServers: iceServers });
    const userConnection = new UserConnection({ userName: '', connectionId: partnerClientId },
      false, connection);

    connection.onnegotiationneeded = async () => {
      if (userConnection.creatingOffer) {
        return;
      }
      userConnection.creatingOffer = true;

      try {
        const desc = await connection.createOffer();
        await connection.setLocalDescription(desc);
        await this.sendSignal({
            type: SignalType.videoOffer,
            sdp: connection.localDescription
          }, partnerClientId);
      } catch (error) {
        this.con.log('Error in onnegotiationneeded:'+ error);
      }

      userConnection.creatingOffer = false;
    };

    connection.oniceconnectionstatechange = () => {
      switch (connection.iceConnectionState) {
        case 'closed':
        case 'failed':
        case 'disconnected':
          this.closeAllVideoCalls();
          break;
      }
    };
    connection.onicegatheringstatechange = () => {
      this.con.log('*** ICE gathering state changed to: ' + connection.iceGatheringState);
    };
    connection.onsignalingstatechange = (event) => {
      this.con.log('*** WebRTC signaling state changed to: ' + connection.signalingState);
      switch (connection.signalingState) {
        case 'closed':
          this.closeAllVideoCalls();
          break;
      }
    };
    connection.onicecandidate = async (event) => {
      if (event.candidate) {
        this.con.log('WebRTC: new ICE candidate');
        await this.sendSignal({
          type: SignalType.newIceCandidate,
          candidate: event.candidate
        }, partnerClientId);
      } else {
        this.con.log('WebRTC: ICE candidate gathering complete');
      }
    };
    connection.onconnectionstatechange = (state) => {
      const states = {
        'iceConnectionState': connection.iceConnectionState,
        'iceGatheringState': connection.iceGatheringState,
        'connectionState': connection.connectionState,
        'signalingState': connection.signalingState
      };

      this.con.log(state);
    };
    connection.ontrack = (event) => {
      this.con.log('Track received from ' + partnerClientId);
      userConnection.setStream(event.streams[0]);
    };

    this._connections[partnerClientId] = userConnection;

    return userConnection;
  }

  private closeAllVideoCalls = () => {
    this.con.log('RtcSignalRService>>closeAllVideoCalls');
    Object.keys(this._connections)
      .forEach(key => {
        this.closeVideoCall(key);
      });
    this._connections = {};
  }

  private closeVideoCall = (partnerClientId: string) => {
    this.con.log('RtcSignalRService>>closeAllVideoCall>>partnerClientId:'+ partnerClientId);
    const connection = this._connections[partnerClientId];
    if (connection) {
      connection.end();
      this._connections[partnerClientId] = undefined;
    }
  }
}
