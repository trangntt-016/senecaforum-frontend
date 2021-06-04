import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainpageService {
  public postMap = new Map();
  constructor() {}

  updateViews(id: number){
    let postId = JSON.stringify(id);
    if (localStorage.getItem(postId) == undefined || localStorage.getItem(postId) == null){
      localStorage.setItem(postId, JSON.stringify(1));
    }
    else{
      const newView = JSON.parse(localStorage.getItem(postId)) + 1;
      // @ts-ignore
      localStorage.setItem(postId, JSON.stringify(newView));
    }
  }
}
