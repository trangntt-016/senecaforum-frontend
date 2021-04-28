import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { NgForm } from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import * as data from '../data/Topic.json';
import * as postData from '../data/Post.json';
import { FilterKeywords } from '../model/FilteredKeywords';
import { ElementSchemaRegistry } from '@angular/compiler';
import { DataManagerService } from '../data-manager.service';



@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})


export class ForumComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  filteredKeyword:FilterKeywords;
  posts: any[]=null;
  private mySub:Subscription

  constructor(
    private dataService:DataManagerService,
    private http:HttpClient,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    // display topics
    this.items = [];
    var topics = data.topics;
    for(var i = 0; i<topics.length; i++){
      var obj = {
        label:topics[i].name
      }
      this.items.push(obj);
    }
    

    // filter
    this.filteredKeyword = {
      searchTag: "",
      start: new Date(),
      end: new Date(),
      updatedDate:"7",
      sortedBy:"titles",
      order:"ascending"
    }


    // display posts
    //get ID from url
    let id = this.route.snapshot.params['id'];
    console.log(id);
    this.mySub = this.dataService.getPostsByTopicId(id, this.pageIndex.toString(), this.pageSize.toString()).subscribe(data=>{
      console.log(data);
      this.posts = data;
    })
    this.length = this.posts.length;
  }
  isDisplayFilter:boolean=false;
  handleDisplayFilter(event){
    var targetElement =event.target.attributes[1].value; 
    if(targetElement=="pi pi-filter"){
      if(!this.isDisplayFilter){
        this.isDisplayFilter = true;
      }
      else{
        this.isDisplayFilter = false;
      }      
    }

  }
  onSubmit(f: NgForm): void {
    var start = this.convertToDateString(f.value.start);
    var end = this.convertToDateString(f.value.end);
  };

  convertToDateString(dateString:string):string{
    var date = new Date(dateString);
    var dd = String(date.getDate()). padStart(2, '0');
    var mm = String(date.getMonth()+1). padStart(2, '0');
    var yyyy = date.getFullYear();
    return yyyy+"-"+mm+"-"+dd;
  }

  displayedColumns: string[] = ['authorAvatarUrl', 'title', 'replies','noOfReplies', 'lastReplyOn'];
  posts:any[];
 
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10];
  showFirstLastButtons = true;

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  ngOnDestroy():void{
    this.mySub.unsubscribe();
  }
  
}




