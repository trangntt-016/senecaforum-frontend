import { Component, Input, OnInit } from '@angular/core';
import { ViewUser } from "../../model/User";
import { ColorConverter } from "../../Utils/ColorConverter";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public avaColor: string;
  public colorUtils;
  @Input()user: ViewUser;
  constructor() { }

  ngOnInit(): void {
    this.colorUtils = new ColorConverter();
    this.avaColor = this.colorUtils.setColor(this.user.username);

  }

}
