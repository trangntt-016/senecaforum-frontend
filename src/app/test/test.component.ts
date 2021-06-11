import { Component, Input, OnChanges, OnDestroy, OnInit, EventEmitter, Output } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AuthService } from '../auth.service';
import { interval, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ChatService } from './chat.service';
import { Message } from '../model/Message';
import { OnlineUserDto } from '../model/User';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ColorConverter } from '../Utils/ColorConverter';
import { TimeConverter } from "../Utils/TimeConverter";



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit{
  @Input()selectedUser: OnlineUserDto;
  @Output() onlUsers = new EventEmitter();
  public isCloseChatBox: boolean;
  private serverUrl = 'http://localhost:3000/ws';
  public title = 'WebSockets chat';
  private stompClient;
  public messages: Message[] = [];

  public timeInterval: Subscription;
  public currentUser: OnlineUserDto;



  constructor(
      private auth: AuthService,
      private chatService: ChatService,
      private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isCloseChatBox = true;

  }

  handleSelectedUser(event){
    this.isCloseChatBox = false;
    this.selectedUser = event;
  }

  handleCloseChatBox(event){
    this.isCloseChatBox = event;
  }

  handleMessages(event){
    this.messages = event;
    console.log(this.messages);
  }


}


// export class TestComponent implements OnInit, OnDestroy {
//   private serverUrl = 'http://localhost:3000/ws';
//   public title = 'WebSockets chat';
//   private stompClient;
//   public messages: Message[] = [];
//   public currentUser: OnlineUserDto;
//   public selectedUser: OnlineUserDto;
//   public message: string;
//   public onlUsers: OnlineUserDto[] = [];
//   public timeInterval: Subscription;
//   public colorUtils;
//   public timeUtils;
//
//   constructor(
//     private auth: AuthService,
//     private chatService: ChatService,
//     private _snackBar: MatSnackBar
//   ) {}
//
//   ngOnInit(): void {
//
//
//     // test
//     this.colorUtils = new ColorConverter();
//     const that = this;
//
//     that.currentUser = new OnlineUserDto(that.auth.readToken().userId, that.auth.readToken().username);
//     this.timeInterval = interval(3000)
//       .pipe(
//         startWith(0),
//         switchMap(() => that.chatService.getOnlineUsers(that.currentUser.userId))).subscribe(users => {
//           const onlineUsrs = [];
//           users.forEach((u) => {
//           if (onlineUsrs.filter(o => o.username === u.username).length === 0 && u.username !== this.currentUser.username) {
//             onlineUsrs.push(u);
//           }
//         });
//         //  that.onlUsers = onlineUsrs;
//       });
//
//
//
//     this.initializeWebSocketConnection();
//
//   }
//
//   ngOnDestroy(): void {
//     this.timeInterval.unsubscribe();
//
//   }
//
//   initializeWebSocketConnection(): void {
//
//     console.log('connected to chat ...');
//
//     const ws = new SockJS(this.serverUrl);
//     this.stompClient = Stomp.over(ws);
//     const that = this;
//     this.stompClient.connect({username: that.currentUser.username}, function(frame) {
//       that.stompClient.subscribe('/user/' + that.currentUser.username + '/queue/messages', (noti) => {
//         const senderName = noti.body.split(',')[1].split(':')[1].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
//         if (that.selectedUser == null || senderName !== that.selectedUser.username){
//           that._snackBar.open('Receive new message from ' + senderName, 'Got it!');
//         }
//         else {
//           that.chatService.getChatMessages(that.selectedUser.userId, that.currentUser.userId).subscribe(mes => {
//             that.messages = mes;
//           });
//         }
//       }, {username: that.currentUser.username});
//     });
//
//   }
//
//   sendMessage(username: string, message: string): void {
//     const mes = new Message();
//     mes.senderId = this.currentUser.userId;
//     mes.senderName = this.currentUser.username;
//     mes.recipientId = this.selectedUser.userId;
//     mes.recipientName = this.selectedUser.username;
//     mes.content = message;
//     const converted = JSON.stringify(mes);
//     this.stompClient.send(`/app/chat`, {}, converted);
//     this.message = null;
//     const tempMes = new Message();
//     tempMes.content = message;
//     this.messages.push(tempMes);
//   }
//
//
//   selectUser(username: string): void {
//     this.selectedUser = this.onlUsers.filter(u => u.username === username)[0];
//     console.log(this.selectedUser);
//     this.chatService.getChatMessages(this.selectedUser.userId, this.currentUser.userId).subscribe(mes => {
//       this.messages = mes;
//     });
//   }
//   public setColor(username: string): void{
//     return this.colorUtils.setColor(username);
//   }
//
// }
//
//
//
//
//
