import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../model/Post';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  constructor(private http: HttpClient) { }

  httpOptions: {headers: HttpHeaders} = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  createNewComment(comment: Comment, postId: number): Observable<any>{
    return this.http.post<any>(`http://localhost:3000/api/posts/${postId}/comments`, comment);
  }
}
