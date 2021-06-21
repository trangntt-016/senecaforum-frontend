import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OnlineUserDto } from '../model/User';
import { Observable } from 'rxjs';
import { Message } from '../model/Message';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  httpOptions: {headers: HttpHeaders} = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'}
    )
  };

  constructor(
    private http: HttpClient
  ) { }

  getOnlineUsers(currentUserId: string): Observable<OnlineUserDto[]>{
    return this.http.get<OnlineUserDto[]>(`${environment.wsAPIBase}/users/${currentUserId}`);
  }

  getChatMessages(senderId: string, recipientId: string): Observable<Message[]>{
    return this.http.get<Message[]>(`${environment.wsAPIBase}/messages/${senderId}/${recipientId}`);
  }
}
