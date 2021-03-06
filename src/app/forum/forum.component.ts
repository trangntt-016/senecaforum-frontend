import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Topic } from '../model/Topic';
import { DataManagerService } from '../data-manager.service';
import { AuthService } from "../auth.service";


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})


export class ForumComponent implements OnInit, OnDestroy {
  @Output() p: number; // pageIdx
  private mySub: Subscription;
  posts: any[] = null;
  username: string;


  constructor(
    private dataService: DataManagerService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ){}

  ngOnInit(): void {
    if(this.auth.readToken()){
      this.username = this.auth.readToken().username;
    }
    else{
      this.username = null;
    }

    // get pageIdx from url changes
    this.mySub = this.route.queryParams.subscribe(params => {
      this.p = params['p'];
    });

  }


  write(): void{
    this.router.navigate([`posts/new`]);
  }


  ngOnDestroy(): void{
    this.mySub.unsubscribe();
  }



}




