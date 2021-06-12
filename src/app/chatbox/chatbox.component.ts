import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  QueryList,
  ViewChild,
  ViewChildren,
  OnChanges
} from '@angular/core';
import { OnlineUserDto } from "../model/User";
import { Subscription } from "rxjs";
import { TimeConverter } from "../Utils/TimeConverter";
import { ColorConverter } from "../Utils/ColorConverter";
import { Message } from "../model/Message";
import { MatAccordion, MatExpansionPanel } from "@angular/material/expansion";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit, OnChanges {
  @Input()selectedUser: OnlineUserDto;
  @Output()isCloseChatBoxEvt = new EventEmitter();
  @Output()sentMessageEvt = new EventEmitter();
  @Input()messages: Message[] = [];
  public text: string;
  public currentUser: OnlineUserDto;
  public onlUsers: OnlineUserDto[] = [];
  public colorUtils;
  public timeUtils;

  constructor(
    private auth: AuthService
  ) { }

  ngOnChanges(): void {}

  ngOnInit(): void {
    this.currentUser = new OnlineUserDto(this.auth.readToken().userId, this.auth.readToken().username);
    this.timeUtils = new TimeConverter();
    this.colorUtils = new ColorConverter();
  }

  public setColor(username: string): void{
    return this.colorUtils.setColor(username);
  }

  convertTime(time: Date): string{
    const converted = this.timeUtils.convertDateComment(time);
    return converted;
  }

  closeChatBox(): void{
    this.isCloseChatBoxEvt.emit(true);
  }

  send(): void {
    const mes = new Message(this.currentUser.userId, this.currentUser.username, this.selectedUser.userId, this.selectedUser.username, this.text);
    const converted = JSON.stringify(mes);
    this.sentMessageEvt.emit(converted);
    this.messages.push(mes);
    // this.messagesEvt.emit(this.messages);

    this.text = null;
  }


}
