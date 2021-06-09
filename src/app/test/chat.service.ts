import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Message } from "../model/Message";
import { OnlineUserDto } from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private http: HttpClient
  ) { }

  getOnlineUsers(currentUserId: string): Observable<OnlineUserDto[]>{
    return this.http.get<OnlineUserDto[]>(`http://localhost:3000/api/messages/onlines/${currentUserId}`);
  }

  getChatMessages(senderId: string, recipientId: string): Observable<Message[]>{
    return this.http.get<Message[]>(`http://localhost:3000/api/messages/${senderId}/${recipientId}`);
  }

}
