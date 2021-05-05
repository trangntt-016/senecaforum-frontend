import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { NgForm } from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


import { FilterKeywords } from '../model/FilteredKeywords';
import { Topic } from '../model/Topic';
import { Post } from '../model/Post';
import { DataManagerService } from '../data-manager.service';
import { TimeConverter } from './Utils/TimeConverter';
import { Route } from '@angular/compiler/src/core';
import { Pagination } from './Utils/Pagination';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})


export class ForumComponent implements OnInit, OnDestroy {
  // topics
  items: MenuItem[];
  topicID:number = this.route.snapshot.params['topicId'];;
  topics:Topic[];

  // post table
  posts: any[]=null;
  private mySub:Subscription;
  private myTableSub:Subscription;

  // filtered table
  isDisplayFilter:boolean=false;
  filteredKeyword:FilterKeywords;
  filteredKeyword = {
    searchTag: '',
    start: new Date(),
    end: new Date(),
    sortedBy:"titles",
    order:"ascending"
  }
  tags;
  currentTag = '';

  // pagination
  public myPagiSub:Subscription;
  public length:number;
  public pageIndex:number;
  public pageSize:number;
  
  constructor(
    private dataService:DataManagerService,
    private router: Router,
    private route: ActivatedRoute
  ){
    // listen to load post table when url changes
    this.router.events.subscribe((event:any)=>{
      if(event instanceof NavigationStart){
       
        let id = event.url.split("/")[2];
        //get size of all posts
        this.myPagiSub = this.dataService.getPostsSize(parseInt(id)).subscribe(size=>{
          this.length = size;
        })
        //load new data when url changes
        this.myTableSub = this.dataService.getPostsByTopicId(parseInt(id),this.pageIndex,this.pageSize).subscribe(posts=>{    
          this.posts = posts;         
        })
      }
    })
  }

  ngOnInit(): void {

    // init topicId when page reload
    this.topicID = this.route.snapshot.params['topicId'];
    // init to display topics 
    this.items = [];
    this.mySub = this.dataService.getAllTopics().subscribe(topics=>{   
      for(var i = 0; i<topics.length; i++){
        var obj = {
          label:topics[i].topicName,
          routerLink: [`/topics/${topics[i].topicId}/posts`], queryParams:{pageIndex:1,pageSize:10}
        }
        this.items.push(obj);
      }

      // init to get query params from url
      this.route.queryParams.subscribe(params => {
        this.pageIndex = params['pageIndex'];
        this.pageSize = params['pageSize'];
      });

      // init to display post table
      this.myTableSub = this.dataService.getPostsByTopicId(this.topicID,this.pageIndex,this.pageSize).subscribe(posts=>{    
        this.posts = posts;
        console.log(posts);
        // init pagi length
        this.myPagiSub = this.dataService.getPostsSize(this.topicID).subscribe(size=>{
       
          this.length = size;
        })
      })
    })


    // no ideas but needs this line so that topics can be displayed
    this.posts.length = 0;
    
    // initialize filtered keywords
    this.filteredKeyword = {
      searchTag: this.currentTag,
      start: new Date(),
      end: new Date(),
      sortedBy:"posts",
      order:"ascending"
    }  
  }

  //handle topics navigation bar
  reload():void{
    window.location.reload();
  }

  // handle filter table
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

  doFilter() {
    this.tags = this.dataService.getAllTags()
      .pipe(map(tag => this.filter(tag)),
      )
  }

  filter(values) {
    return values.filter(tag => tag.tagName.toLowerCase().includes(this.currentTag))
  }

  onSubmit(f: NgForm): void {
    var utils = new TimeConverter();

    f.value.start = utils.convertToYYYYMMDD(f.value.start);
    f.value.end = utils.convertToYYYYMMDD(f.value.end);
    console.log(f.value);

  };

  // handle post table
  convertDateLastComment(convertedDate:Date):string{
    var utils = new TimeConverter();
    return utils.convertDateComment(convertedDate);
  }


  // MatPaginator Output

  pageEvent(event){
    var convertedIdx = event.pageIndex+1;
    this.pageIndex = convertedIdx;
    this.router.navigate([`topics/${this.topicID}/posts`],{queryParams:{pageIndex:convertedIdx,pageSize:10}})
    
  };



  ngOnDestroy():void{
    this.mySub.unsubscribe();
    this.myTableSub.unsubscribe();
    this.myPagiSub.unsubscribe();
  }

  
  
}




