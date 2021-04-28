import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  constructor(
    private http: HttpClient
  ) { }

  getSideBars():Observable<string[]>{
    return this.http.get<string[]>(`http://localhost:3000/api/sidebars`);
  }
  getHotPosts(page:string,limit:string): any {
      return this.http.get<any>(`https://http://localhost:3000/posts?_page=${page}&_limit=${limit}/`);
  }

  getPostsByTopicId(id:string, page:string,limit:string){
    return this.http.get<any>(`https://http://localhost:3000/topics/${id}/posts?_page=${page}&_limit=${limit}/`);
  }

  getPostByPostId(id:string){
    return this.http.get<any>(`https://http://localhost:3000/topics/${id}/posts/${id}`);
  }


  
}
