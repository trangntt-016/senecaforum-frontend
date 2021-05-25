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
import { TimeConverter } from '../Utils/TimeConverter';
import { Route } from '@angular/compiler/src/core';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})


export class ForumComponent implements OnInit, OnDestroy {
  // topics
  items: MenuItem[];
  topicID: number = this.route.snapshot.params.topicId;
  topics: Topic[];

  // post table
  posts: any[] = null;
  private mySub: Subscription;
  private myTableSub: Subscription;

  // filtered table
  isDisplayFilter = false;
  filteredKeyword: FilterKeywords = {
    searchTag: '',
    start: new Date('2021-01-01'),
    end:  new Date(),
    sortedBy: 'titles',
    order: 'ascending'
  };
  tags;
  currentTag = '';

  // pagination
  public myPagiSub: Subscription;
  public length: number;
  public p: number;

  constructor(
    private dataService: DataManagerService,
    private router: Router,
    private route: ActivatedRoute
  ){
    // listen to load post table when url changes
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart){
        this.isDisplayFilter = false;
        const id = event.url.split('/')[2];
        // get size of all posts
        this.myPagiSub = this.dataService.getPostsSize(parseInt(id)).subscribe(size => {
          this.length = size;
        });
        if (event.url.split('&').length > 2){
          // load filtered data when url changes
          const tokens = event.url.split('&');
          const tag = (tokens[2].split('='))[1];
          const start = (tokens[3].split('='))[1];
          const end = (tokens[4].split('='))[1];
          const sorted = (tokens[5].split('='))[1];
          const orderby = (tokens[6].split('='))[1];
          this.myTableSub = this.dataService.getPostsByTopicIdWithFilter(parseInt(id), this.p, tag, start, end, sorted, orderby).subscribe(posts => {
            this.posts = posts;
          });
       }

        // get size of all posts
        this.myPagiSub = this.dataService.getPostsSize(parseInt(id)).subscribe(size => {
          this.length = size;
        });
        // load new data when url changes
        this.myTableSub = this.dataService.getPostsByTopicId(parseInt(id), this.p).subscribe(posts => {
          this.posts = posts;
        });
      }
    });
  }

  ngOnInit(): void {

    // init topicId when page reload
    this.topicID = this.route.snapshot.params.topicId;

    // init to display topics
    this.items = [];
    this.mySub = this.dataService.getAllTopics().subscribe(topics => {
      for (let i = 0; i < topics.length; i++){
        const obj = {
          label: topics[i].topicName,
          routerLink: [`/topics/${topics[i].topicId}/posts`], queryParams: {pageIndex: 1, pageSize: 10}
        };
        this.items.push(obj);
      }

      // init to get query params from url
      this.route.queryParams.subscribe(params => {
        this.p = params.p;
      });

      // init to display post table
      this.myTableSub = this.dataService.getPostsByTopicId(this.topicID, 1).subscribe(posts => {
        this.posts = posts;
        console.log(posts);
        // init pagi length
        this.myPagiSub = this.dataService.getPostsSize(this.topicID).subscribe(size => {

          this.length = size;
        });
      });
    });


    // no ideas but needs this line so that topics can be displayed
    this.posts.length = 0;

    // initialize filtered keywords
    this.filteredKeyword = {
      searchTag: this.currentTag,
      start: new Date(),
      end: new Date(),
      sortedBy: 'posts',
      order: 'ascending'
    };
  }

  // handle topics navigation bar
  reload(): void{
    window.location.reload();
  }

  // handle filter table
  handleDisplayFilter(event){
    const targetElement = event.target.attributes[1].value;
    if (targetElement == 'pi pi-filter'){
      if (!this.isDisplayFilter){
        this.isDisplayFilter = true;
      }
      else{
        this.isDisplayFilter = false;
      }
    }
    // else if(event.target.classList[0]=="mat-icon"||event.target.classList[0]=="mat-focus-indicator"){
    //   this.isDisplayFilter = false;
    // }
  }

  doFilter() {
    this.tags = this.dataService.getAllTags()
      .pipe(map(tag => this.filter(tag)),
      );
  }

  filter(values) {
    return values.filter(tag => tag.tagName.toLowerCase().includes(this.currentTag));
  }

  onSubmit(f: NgForm): void {
    const utils = new TimeConverter();

    f.value.start = utils.convertToYYYYMMDD(f.value.start);
    f.value.end = utils.convertToYYYYMMDD(f.value.end);


    this.router.navigate([`topics/${this.topicID}/posts`], {queryParams:
      {
        p: 1,
        tag: f.value.searchTag,
        start: f.value.start,
        end: f.value.end,
        sorted: f.value.sortedBy,
        orderby: f.value.order
      }});

  }

  // handle post table
  convertDateLastComment(convertedDate: Date): string{
    const utils = new TimeConverter();
    return utils.convertDateComment(convertedDate);
  }


  // MatPaginator Output

  pageEvent(event){
    const convertedIdx = event.pageIndex + 1;
    this.p = convertedIdx;
    this.isDisplayFilter = false;
    this.router.navigate([`topics/${this.topicID}/posts`], {queryParams: {p: convertedIdx, pageSize: 10}});

  }



  ngOnDestroy(): void{
    this.mySub.unsubscribe();
    this.myTableSub.unsubscribe();
    this.myPagiSub.unsubscribe();
  }



}




