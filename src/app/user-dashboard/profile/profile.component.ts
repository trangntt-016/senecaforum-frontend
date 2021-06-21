import { Component, Input, OnInit } from '@angular/core';
import { ViewUser } from '../../model/User';
import { ColorConverter } from '../../Utils/ColorConverter';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input()user: ViewUser;
  @Input()noOfPendingPosts: number;
  public colorUtils;
  constructor() { }

  ngOnInit(): void {
    this.colorUtils = new ColorConverter();
  }

  public setColor(username: string): void{
    return this.colorUtils.setColor(username);
  }

}
