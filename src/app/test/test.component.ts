import { Component, OnDestroy, OnInit } from '@angular/core';
import $ from 'jquery';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AuthService } from "../auth.service";
import { interval, Subscription } from "rxjs";
import { startWith, switchMap } from "rxjs/operators";



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})


export class TestComponent implements OnInit, OnDestroy{
  private serverUrl = 'http://localhost:3000/chat';
  public title = 'WebSockets chat';
  private stompClient;
  public messages: string[] = [];
  public username;
  public selectedUser:string;
  public message: string;
  public onlUsers = [];
  public timeInterval: Subscription;

  constructor(
    private auth: AuthService
  ){}

  ngOnInit(): void{
    this.timeInterval = interval(3000)
      .pipe(
        startWith(0),
        switchMap(()=>this.auth.getOnlineUsers())).subscribe(users=>{
          const onlineUsrs = [];
          users.forEach((u) => {
            const username = Object.keys(u).reduce((k) => k + '');
            const sessionId = Object.values(u).reduce((v) => v + '');
            const user = {
              username,
              sessionId
            };
            if (onlineUsrs.filter(o => o.username === user.username).length==0){
              onlineUsrs.push(user);
            }
        });
          this.onlUsers = onlineUsrs;
      });

    this.username = this.auth.readToken().sub;
    this.initializeWebSocketConnection();
    this.auth.getOnlineUsers().subscribe(users => {
      console.log(users);
//      this.onlUsers = users;
    });
  }

  ngOnDestroy(): void {
    this.timeInterval.unsubscribe();
  }

  initializeWebSocketConnection(): void{

    console.log('connected to chat ...');

    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({username: that.username}, function(frame) {
      console.log('connected to ' + frame);
      that.stompClient.subscribe('/topic/messages/'+that.username, (message) => {
        console.log("from server: "+message.body);
        if (message.body) {
          that.messages.push(message.body);
        }
      },{username: that.username});
    });
  }

  sendMessage(username: string, message: string): void{
    const data = {
      message,
      fromLogin: username
    };
    const converted = JSON.stringify(data);
    this.stompClient.send(`/app/chat/`+this.selectedUser, {}, converted);
    this.message = null;
  }

  update():void{
    this.auth.getOnlineUsers().subscribe(users => {
      const onlineUsrs = [];
      users.forEach((u) => {
        const username = Object.keys(u).reduce((k) => k + '');
        const sessionId = Object.values(u).reduce((v) => v + '');
        const user = {
          username,
          sessionId
        };
        if(onlineUsrs.filter(o=>o.username===user.username).length==0){
          onlineUsrs.push(user);
        }
      });
      this.onlUsers = onlineUsrs;
    })
  }

  selectUser(username: string): void{
    this.selectedUser = username;
  }


}




