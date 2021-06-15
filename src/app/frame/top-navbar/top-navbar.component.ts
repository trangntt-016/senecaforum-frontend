import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { ColorConverter } from "../../Utils/ColorConverter";

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {
  @Output()toggleEvt = new EventEmitter();
  public isToggle: boolean;
  public isUser: boolean;
  public isGuest: boolean = true;
  public isAdmin: boolean;
  public username: string;
  private colorUtils;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.isToggle = false;
    this.colorUtils = new ColorConverter();

    // listen to emission from login
    this.auth.payload.subscribe(p => {
      this.username = p.username;
      switch (this.auth.readToken().role){
        case "ROLE_USER":
          this.isUser = true;
          this.isAdmin = false;
          this.isGuest = false;
          break;
        case "ROLE_ADMIN":
          this.isAdmin = true;
          this.isGuest = false;
          this.isUser = false;
          break;
        default:
          this.isGuest = true;
          this.isAdmin = false;
          this.isUser = false;
      }
    });

    //by default (reload, start new page)
    if(this.auth.readToken()!=null){
      let role = this.auth.readToken().role;
      switch (role){
        case "ROLE_USER":
          this.isUser = true;
          this.isAdmin = false;
          this.isGuest = false;
          break;
        case "ROLE_ADMIN":
          this.isAdmin = true;
          this.isGuest = false;
          this.isUser = false;
          break;
        default:
          this.isGuest = true;
          this.isAdmin = false;
          this.isUser = false;
      }
      this.username = this.auth.readToken().username;
    }




  }

  public setColor(username: string): void{
    return this.colorUtils.setColor(username);
  }

  navigateDashboard(): void{
    if (this.isAdmin){
      this.router.navigate(['users',this.auth.readToken().userId,'admin']);
    }
    else if(this.isUser){
      this.router.navigate(['users',this.auth.readToken().userId,'posts']);
    }
  }
  public logout(): void{
    this.auth.logout();
    this.username = null;
    this.isGuest = true;
    this.isAdmin = false;
    this.isUser = false;
    this.router.navigate(['login']);
  }

  toggleSideNav():void{
    this.isToggle = !this.isToggle;
    this.toggleEvt.emit(this.isToggle);
  }

}
