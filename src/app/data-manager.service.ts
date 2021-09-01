import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post, PostSearchDto, PostViewDto } from './model/Post';
import { Topic, TopicStats } from './model/Topic';
import { ViewUser } from './model/User';
import { environment } from 'src/environments/environment';
import { QueryParams } from "./model/QueryParams";
import { PostsForumResult } from "./model/PostsForumResult";



@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  tags = [];
  constructor(
    private http: HttpClient
  ) { }

  httpOptions: {headers: HttpHeaders} = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'}
      )
  };


  getAllTags(): Observable<any> {
    return this.tags.length ? of(this.tags)
      : this.http.get<any>(`${environment.tagAPIBase}`).pipe(
        map((data) => {
          this.tags = data;
          return this.tags;
        })
      )
  }

  getPostsSize(topicId: string): Observable<number>{
    return this.http.get<number>(`${environment.topicAPIBase}/${topicId}/posts/size`);
  }

  getAllTopics(): Observable<Topic[]>{
    return this.http.get<Topic[]>(`${environment.topicAPIBase}`,this.httpOptions);
  }


  getPostsByTopicIdWithFilter(queryParams: QueryParams): Observable<PostsForumResult>{
    let query = `${environment.topicAPIBase}/${queryParams.topicId}/posts?p=${queryParams.p}`;
    if (queryParams.tags !== undefined){
      query += '&tags=' + queryParams.tags;
    }
    if(queryParams.s !== undefined){
      query += '&s=' + queryParams.s;
    }
    if(queryParams.e !== undefined){
      query += '&e=' + queryParams.e;
    }
    if(queryParams.sortBy !== undefined){
      query += '&sortBy=' + queryParams.sortBy;
    }
    if(queryParams.order !== undefined){
      query += '&order=' + queryParams.order;
    }
    return this.http.get<PostsForumResult>(query);
  }

  getPostByPostId(postId: number): Observable<Post>{
    return this.http.get<any>(`${environment.postAPIBase}/${postId}`);
  }

  createNewPost(post: Post): Observable<any>{
    return this.http.post<any>(`${environment.postAPIBase}`, post);
  }

  editAPost(post: Post): Observable<any>{
    return this.http.put<any>(`${environment.postAPIBase}`, post);
  }

  getHotPosts(page: number): Observable<PostViewDto[]>{
    return this.http.get<PostViewDto[]>(`${environment.postAPIBase}/hot?page=${page}`);
  }

  getTopicStats(topicId: string): Observable<TopicStats>{
    return this.http.get<TopicStats>(`${environment.topicAPIBase}/${topicId}/stats`);
  }

  searchPostsByContent(keyword: string): Observable<PostSearchDto[]>{
    return this.http.get<PostSearchDto[]>(`${environment.postAPIBase}?content=${keyword}`);
  }

  getUserByUserId(userId: string): Observable<ViewUser>{
    return this.http.get<ViewUser>(`${environment.userAPIBase}/${userId}`);
  }

  getPostsByUserId(userId: string): Observable<PostViewDto[]>{
    return this.http.get<PostViewDto[]>(`${environment.postAPIBase}/user/${userId}`);
  }

  deleteAPost(postId: number, userId: string): Observable<any>{
    return this.http.delete<any>(`${environment.postAPIBase}/${postId}`);
  }

  getAllPostsOrderByStatus(): Observable<PostViewDto[]>{
    return this.http.get<PostViewDto[]>(`${environment.postAPIBase}/all`);
  }

  updateStatusPosts(selectedPostIds: number[], status: string): Observable<PostViewDto[]>{
    return this.http.put<PostViewDto[]>(`${environment.postAPIBase}/status?status=${status}`, selectedPostIds);
  }

  getNoOfAllPosts(): Observable<number>{
    return this.http.get<number>(`${environment.postAPIBase}/size`);
  }

}
