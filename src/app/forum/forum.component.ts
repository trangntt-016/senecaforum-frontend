import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
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
  @Output() topics: Topic[];
  @Output() p: number; // pageIdx
  private posts: any[] = null;
  private mySub: Subscription;

  constructor(
    private dataService: DataManagerService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    // get pageIdx from url changes
    this.mySub = this.route.queryParams.subscribe(params => {
      this.p = params['p'];
    });
    this.mySub = this.dataService.getAllTopics().subscribe(topics =>{
      this.topics = topics;
    });

    // no ideas but needs this line so that topics can be displayed
    this.posts.length = 0;
  }




  ngOnDestroy(): void{
    this.mySub.unsubscribe();
  }



}




