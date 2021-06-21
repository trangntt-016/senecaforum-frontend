import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../model/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  constructor(private http: HttpClient) { }

  httpOptions: {headers: HttpHeaders} = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  createNewComment(comment: Comment, postId: number): Observable<any>{
    return this.http.post<any>(`http://ec2-18-220-245-72.us-east-2.compute.amazonaws.com:3000/api/posts/${postId}/comments`, comment);
  }
}
