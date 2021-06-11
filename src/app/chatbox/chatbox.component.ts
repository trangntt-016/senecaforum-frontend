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

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit, OnChanges {
  @ViewChild('panel')panel: MatAccordion;
  @Input()selectedUser: OnlineUserDto;
  @Output()isCloseChatBox = new EventEmitter();
  @Output() currentUser: OnlineUserDto;
  public onlUsers: OnlineUserDto[] = [];
  public colorUtils;
  public timeUtils;
  @Input()messages: Message[] = [];
  constructor() { }

  ngOnChanges(): void {
    console.log(this.messages);
  }

  ngOnInit(): void {
    this.timeUtils = new TimeConverter();
    this.colorUtils = new ColorConverter();
  }

  public setColor(username: string): void{
    return this.colorUtils.setColor(username);
  }

  convertTime(time: Date){
    const converted = this.timeUtils.convertDateComment(time);
    return converted;
  }

  closeChatBox():void{
    this.isCloseChatBox.emit(true);
  }



}
