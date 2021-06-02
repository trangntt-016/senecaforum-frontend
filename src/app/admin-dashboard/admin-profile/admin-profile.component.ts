import { Component, Input, OnInit } from '@angular/core';
import { ViewUser } from '../../model/User';
import { ColorConverter } from '../../Utils/ColorConverter';
import { DataManagerService } from "../../data-manager.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  public avaColor: string;
  public colorUtils;
  @Input()admin: ViewUser;
  constructor() { }

  ngOnInit(): void {
    this.colorUtils = new ColorConverter();
    this.avaColor = this.colorUtils.setColor(this.admin.username);

  }

}
