import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { OnlineUserDto } from "./model/User";
import { Message } from "./model/Message";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  @Input()selectedUser: OnlineUserDto;
  @Input()sentMessage: Message;
  @Output() onlUsers = new EventEmitter();
  public title = 'SenecaForum';
  public username: string;
  public open: boolean;
  public isCloseChatBox: boolean;
  public messages: Message[] = [];

  constructor(){}

  ngOnInit(): void{
    this.open = false;
    this.isCloseChatBox = true;
  }

  handleToggleTopNavbar(event): void{
    this.open = event;
  }

  handleSelectedUser(event): void{
    this.isCloseChatBox = false;
    this.selectedUser = event;
  }

  handleCloseChatBox(event): void{
    this.isCloseChatBox = event;
  }

  handleMessages(event): void{
    this.messages = event;
  }

  handleSentMessage(event): void{
    this.sentMessage = event;
  }

}
