import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Topic } from '../model/Topic';
import { DataManagerService } from '../data-manager.service';


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




