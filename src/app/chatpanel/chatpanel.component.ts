import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ViewChild } from '@angular/core';
import { Message } from '../model/Message';
import { OnlineUserDto } from '../model/User';
import { interval, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ColorConverter } from '../Utils/ColorConverter';
import { startWith, switchMap } from 'rxjs/operators';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ChatService } from './chat.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-chatpanel',
  templateUrl: './chatpanel.component.html',
  styleUrls: ['./chatpanel.component.css']
})
export class ChatpanelComponent implements OnInit, OnChanges {
  @ViewChild('drawer') drawer: MatDrawer;
  private serverUrl = environment.wsAPIBase;
  private stompClient;
  @Input()sentMessage: Message;
  @Output()selectedUsrEvt = new EventEmitter();
  @Output()messagesEvt = new EventEmitter();
  public messages: Message[] = [];
  public noOfUsersHavingNewMsgs: number;
  public currentUser: OnlineUserDto;
  public selectedUser: OnlineUserDto;
  public message: string;
  public onlUsers: OnlineUserDto[];
  public timeInterval: Subscription;
  public colorUtils;
  public isLogIn: boolean;

  constructor(
    public auth: AuthService,
    private chatService: ChatService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.onlUsers = [];
    this.colorUtils = new ColorConverter();
    this.noOfUsersHavingNewMsgs = 0;

    // catch payload from login
    this.auth.payload.subscribe(p => {
      this.isLogIn = (this.auth.readToken()!=null)?true:false;
      this.currentUser = new OnlineUserDto(this.auth.readToken().userId, this.auth.readToken().username);
      this.isLogIn = (this.auth.readToken()!=null)?true:false;
      this.colorUtils = new ColorConverter();
      this.currentUser = new OnlineUserDto(this.auth.readToken().userId, this.auth.readToken().username);

      const that = this;
      this.timeInterval = interval(3000)
        .pipe(
          startWith(0),
          switchMap(() => that.chatService.getOnlineUsers(that.currentUser.userId))).subscribe(users => {
          this.noOfUsersHavingNewMsgs = 0;
          const onlineUsrs = [];
          users.forEach((u) => {
            // remove currentUser from online list and recheck non duplicate value from backend
            if (onlineUsrs.filter(o => o.username === u.username).length === 0 && u.username !== this.currentUser.username) {
              onlineUsrs.push(u);
            }
            if (u.noOfNewMessages > 0 && u.noOfNewMessages != null){
              this.noOfUsersHavingNewMsgs += 1;
            }
          });

          that.onlUsers = onlineUsrs;
        }, (error => {
          if (error.status === 403){
            this._snackBar.open('Your login session has expired!', 'Got it!', {duration: 5000});
            this.auth.logout();
            this.router.navigate(['login']);
          }}));

      this.initializeWebSocketConnection();
    });
    // if(this.auth.readToken()!=null){
      this.isLogIn = (this.auth.readToken()!=null)?true:false;
      this.colorUtils = new ColorConverter();
      if(this.auth.readToken()!=null) {
        this.currentUser = new OnlineUserDto(this.auth.readToken().userId, this.auth.readToken().username);
      }


      const that = this;
      this.timeInterval = interval(3000)
        .pipe(
          startWith(0),
          switchMap(() => that.chatService.getOnlineUsers(that.currentUser.userId))).subscribe(users => {
          this.noOfUsersHavingNewMsgs = 0;
          const onlineUsrs = [];
          users.forEach((u) => {
            // remove currentUser from online list and recheck non duplicate value from backend
            if (onlineUsrs.filter(o => o.username === u.username).length === 0 && u.username !== this.currentUser.username) {
              onlineUsrs.push(u);
            }
            if (u.noOfNewMessages > 0 && u.noOfNewMessages != null){
              this.noOfUsersHavingNewMsgs += 1;
            }
          });

          that.onlUsers = onlineUsrs;
        }, (error => {
          if (error.status === 403){
            this._snackBar.open('Your login session has expired!', 'Got it!', {duration: 5000});
            this.auth.logout();
            this.router.navigate(['login']);
          }}));

      this.initializeWebSocketConnection();
    //}
  }

  ngOnChanges(): void{
    if (this.sentMessage != null){
      this.stompClient.send(`/app/chat`, {}, this.sentMessage);
    }
    this.sentMessage = null;
  }

  ngOnDestroy(): void {
    this.timeInterval.unsubscribe();
  }

  initializeWebSocketConnection(): void {

    console.log('connected to chat ...');

    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({username: that.currentUser.username}, function(frame) {
      that.stompClient.subscribe('/user/' + that.currentUser.username + '/queue/messages', (noti) => {
        const senderName = noti.body.split(',')[1].split(':')[1].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
        if (that.selectedUser == null || senderName !== that.selectedUser.username) {
          that._snackBar.open('Receive new message from ' + senderName, 'Got it!');
        } else {
          that.chatService.getChatMessages(that.selectedUser.userId, that.currentUser.userId).subscribe(mes => {
            that.messagesEvt.emit(mes);
          });
        }
      }, {username: that.currentUser.username});
    });
  }

  public setColor(username: string): void {
    return this.colorUtils.setColor(username);
  }

  public openChatBox(user: OnlineUserDto): void{
    this.selectedUser = user;
    this.selectedUsrEvt.emit(user);
    this.chatService.getChatMessages(user.userId, this.currentUser.userId).subscribe(mes => {
      this.messages = mes;
      this.messagesEvt.emit(mes);
    });
  }

  public openDrawer():void{
    if(this.auth.readToken()!=null){
      this.drawer.toggle();
    }
    else{
      this._snackBar.open('Please login to chat with others', 'Login', { duration: 3000})
        .onAction()
        .subscribe(() => this.router.navigateByUrl('/login'));
    }
  }
}
