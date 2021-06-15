import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post, PostSearchDto, PostViewDto } from './model/Post';
import { Topic, TopicStats } from './model/Topic';
import { ViewUser } from "./model/User";


@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  tags = [];
  constructor(
    private http: HttpClient
  ) { }

  httpOptions:{headers: HttpHeaders} = {
    headers: new HttpHeaders({'Access-Control-Allow-Origin':'*',})
  }

  getAllTags(): Observable<any> {
    return this.tags.length ? of(this.tags)
      : this.http.get<any>('http://localhost:3000/api/tags').pipe(
        map((data) => {
          this.tags = data;
          return this.tags;
        })
      )
  }

  getPostsSize(topicId: string): Observable<number>{
    return this.http.get<number>(`http://localhost:3000/api/topics/${topicId}/posts/size`);
  }

  getAllTopics(): Observable<Topic[]>{
    return this.http.get<Topic[]>(`http://localhost:3000/api/topics`);
  }

  getPostsByTopicId(topicId: string, page:number): Observable<PostViewDto[]>{
    return this.http.get<PostViewDto[]>(`http://localhost:3000/api/topics/${topicId}/posts?p=${page}`);
  }

  getPostsByTopicIdWithFilter(topicId: string,
                              p: number,
                              tags: string,
                              s: string,
                              e: string,
                              sortBy: string,
                              order: string): Observable<PostViewDto[]>{
    return this.http.get<PostViewDto[]>(`http://localhost:3000/api/topics/${topicId}/posts?p=${p}&tags=${tags}&s=${s}&e=${e}&sortBy=${sortBy}&order=${order}`);
  }

  getPostByPostId(postId: number): Observable<Post>{
    return this.http.get<any>(`http://localhost:3000/api/posts/${postId}`);
  }

  createNewPost(post: Post): Observable<any>{
    return this.http.post<any>(`http://localhost:3000/api/posts`, post);
  }

  editAPost(post: Post): Observable<any>{
    return this.http.put<any>(`http://localhost:3000/api/posts`, post);
  }

  getHotPosts(page: number): Observable<PostViewDto[]>{
    return this.http.get<PostViewDto[]>(`http://localhost:3000/api/posts/hot?page=${page}`);
  }

  getTopicStats(): Observable<TopicStats[]>{
    return this.http.get<TopicStats[]>(`http://localhost:3000/api/topics/stats`);
  }

  searchPostsByContent(keyword: string): Observable<PostSearchDto[]>{
    return this.http.get<PostSearchDto[]>(`http://localhost:3000/api/posts?content=${keyword}`);
  }

  getUserByUserId(userId: string): Observable<ViewUser>{
    return this.http.get<ViewUser>(`http://localhost:3000/api/users/${userId}`);
  }

  getPostsByUserId(userId: string): Observable<PostViewDto[]>{
    return this.http.get<PostViewDto[]>(`http://localhost:3000/api/users/${userId}/posts`)
  }

  deleteAPost(postId: number, userId: string): Observable<any>{
    return this.http.delete<any>(`http://localhost:3000/api/users/${userId}/posts/${postId}`);
  }

  getAllPostsOrderByStatus(): Observable<PostViewDto[]>{
    return this.http.get<PostViewDto[]>(`http://localhost:3000/api/posts/all`);
  }

  updateStatusPosts(selectedPostIds: number[], status: string): Observable<PostViewDto[]>{
    return this.http.put<PostViewDto[]>(`http://localhost:3000/api/posts/status?status=${status}`, selectedPostIds);
  }

  getNoOfAllPosts(): Observable<number>{
    return this.http.get<number>(`http://localhost:3000/api/posts/noOfAllPosts`);
  }

}
