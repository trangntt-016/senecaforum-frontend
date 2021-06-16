import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewUser } from '../model/User';
import { DataManagerService } from "../data-manager.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../auth.service";

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
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
    });
    this.dataSub = this.dataService.getUserByUserId(this.userId).subscribe(u => {
      this.user = u;
    }, (error => {
      if (error.status === 403){
        this._snackBar.open('Your login session has expired!', 'Got it!', {duration: 5000});
        this.auth.logout();
        this.router.navigate(['login']);
      }
    }));
  }

  ngOnDestroy():void{
    this.routeSub.unsubscribe();
    this.dataSub.unsubscribe();
  }

  handlePendingPosts(pending: number): void{
    this.noOfPendingPosts = pending;
  }


}
