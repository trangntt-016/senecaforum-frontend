
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
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})


export class TestComponent implements OnInit, OnDestroy {
  // topics
  items: MenuItem[];

  // post table
  posts: any[] = null;
  constructor(
    private dataService: DataManagerService
  ){}

  ngOnInit(): void {
    // init to display topics
    this.items = [];
    this.dataService.getAllTopics().subscribe(topics => {
      for (let i = 0; i < topics.length; i++){
        const obj = {
          label: topics[i].topicName,
          routerLink: [`/topics/${topics[i].topicId}/posts`], queryParams: {pageIndex: 1, pageSize: 10}
        };
        this.items.push(obj);
      }
    });
    // no ideas but needs this line so that topics can be displayed
    this.posts.length = 0;
  }

  // handle topics navigation bar
  reload(): void{
    window.location.reload();
  }




  ngOnDestroy(): void{
  }



}




