import { Component, OnInit } from '@angular/core';
import { ViewUser } from "../model/User";
import { DataManagerService } from "../data-manager.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public admin: ViewUser;

  constructor(
    private dataService: DataManagerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.params['userId'];
    this.dataService.getUserByUserId(userId).subscribe(u=>{
      this.admin = u;
    })
  }

}
