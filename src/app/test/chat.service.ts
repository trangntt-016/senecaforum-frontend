import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Message } from "../model/Message";
import { OnlineUserDto } from "../model/User";
import { AuthService } from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService{
  constructor(
    private http: HttpClient
  ) { }

  getOnlineUsers(currentUserId: string): Observable<OnlineUserDto[]>{
    return this.http.get<OnlineUserDto[]>(`http://localhost:3000/api/ws/users/${currentUserId}`);
  }

  getChatMessages(senderId: string, recipientId: string): Observable<Message[]>{
    return this.http.get<Message[]>(`http://localhost:3000/api/ws/messages/${senderId}/${recipientId}`);
  }



}
