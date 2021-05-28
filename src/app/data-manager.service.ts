import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post, PostViewDto } from './model/Post';
import { Topic, TopicStats } from './model/Topic';


@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  tags = [];
  constructor(
    private http: HttpClient
  ) { }

  getAllTags() {
    return this.tags.length ? of(this.tags)
      : this.http.get<any>('http://localhost:3000/api/tags').pipe(
        map((data) => {
          this.tags = data;
          return this.tags;
        })
      )
  }

  getPostsSize(topicId: number): Observable<number>{
    return this.http.get<number>(`http://localhost:3000/api/topics/${topicId}/posts/size`);
  }

  getAllTopics(): Observable<Topic[]>{
    return this.http.get<Topic[]>(`http://localhost:3000/api/topics`);
  }

  getPostsByTopicId(topicId: number, page:number): Observable<Post[]>{
    return this.http.get<Post[]>(`http://localhost:3000/api/topics/${topicId}/posts?p=${page}`);
  }

  getPostsByTopicIdWithFilter(topicId: number,
                              p: number,
                              tags: string,
                              s: string,
                              e: string,
                              sortBy: string,
                              order: string): Observable<Post[]>{
    return this.http.get<Post[]>(`http://localhost:3000/api/topics/${topicId}/posts?p=${p}&tags=${tags}&s=${s}&e=${e}&sortBy=${sortBy}&order=${order}`);
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

  getHotPosts(): Observable<PostViewDto[]>{
    return this.http.get<PostViewDto[]>(`http://localhost:3000/api/posts/hot`);
  }

  getTopicStats(): Observable<TopicStats[]>{
    return this.http.get<TopicStats[]>(`http://localhost:3000/api/topics/stats`);
  }

}
