import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './model/Post';
import { Topic } from './model/Topic';


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

  getPostsSize(topicId:number):Observable<number>{
    return this.http.get<number>(`http://localhost:3000/api/topics/${topicId}/posts/size`);
  }
  
  getAllTopics():Observable<Topic[]>{
    return this.http.get<Topic[]>(`http://localhost:3000/api/topics`);
  }
  getHotPosts(page:string,limit:string): any {
      return this.http.get<any>(`https://http://localhost:3000/posts?_page=${page}&_limit=${limit}/`);
  }

  getPostsByTopicId(topicId:number, page:Number):Observable<Post[]>{
    return this.http.get<Post[]>(`http://localhost:3000/api/topics/${topicId}/posts?p=${page}`);
  }

  getPostsByTopicIdWithFilter(topicId:number, page:number, tag:any,start:string,end:string,sorted:string,orderby:string):Observable<Post[]>{
    return this.http.get<Post[]>(`http://localhost:3000/api/topics/${topicId}/posts?p=${page}&tag=${tag}&start=${start}&end=${end}&sorted=${sorted}&orderby=${orderby}`);
  }

  getPostByPostId(id:string){
    return this.http.get<any>(`https://http://localhost:3000/topics/${id}/posts/${id}`);
  }


  
}
