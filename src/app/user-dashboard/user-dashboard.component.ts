import { Component, OnInit } from '@angular/core';
import { ViewUser } from '../model/User';
import { DataManagerService } from "../data-manager.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  public user: ViewUser;

  constructor(
    private dataService: DataManagerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let userId = this.activatedRoute.snapshot.params['userId'];
    this.dataService.getUserByUserId(userId).subscribe(u=>{
      this.user = u;
    })
  }

}
