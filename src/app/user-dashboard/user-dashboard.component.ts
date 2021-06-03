import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewUser } from '../model/User';
import { DataManagerService } from "../data-manager.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  public user: ViewUser;
  public noOfPendingPosts: number;
  private userId: string;
  private routeSub: Subscription;
  private dataSub: Subscription;

  constructor(
    private dataService: DataManagerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
    });
    this.dataSub = this.dataService.getUserByUserId(this.userId).subscribe(u => {
      this.user = u;
    })
  }

  ngOnDestroy():void{
    this.routeSub.unsubscribe();
    this.dataSub.unsubscribe();
  }

  handlePendingPosts(pending: number): void{
    this.noOfPendingPosts = pending;
  }


}
