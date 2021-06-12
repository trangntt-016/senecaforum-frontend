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
  @Input()sentMessage: Message;
  @Output() onlUsers = new EventEmitter();
  public isCloseChatBox: boolean;
  private serverUrl = 'http://localhost:3000/ws';
  public title = 'WebSockets chat';
  private stompClient;
  public messages: Message[] = [];

  public timeInterval: Subscription;

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

  handleSentMessage(event): void{
    this.sentMessage = event;
  }

}


