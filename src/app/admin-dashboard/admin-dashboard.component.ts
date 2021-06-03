import { Component, OnInit } from '@angular/core';
import { ViewUser } from "../model/User";
import { DataManagerService } from "../data-manager.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  private routeSub: Subscription;
  public admin: ViewUser;
  public userId: string;
  public noOfPendingPosts: number;

  constructor(
    private dataService: DataManagerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // get pageIdx from url changes
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
    });
    this.dataService.getUserByUserId(this.userId).subscribe(u=>{
      this.admin = u;
    })
  }

  ngOnDestroy(): void{
    this.routeSub.unsubscribe();
  }

  handleNoOfPendingPosts(pending: number): void{
    this.noOfPendingPosts = pending;
  }

}
