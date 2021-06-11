import { Component, OnDestroy, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ColorConverter } from './Utils/ColorConverter';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  private colorUtils;
  public title = 'SenecaForum';
  public searchString = '';
  public username: string;
  public isUser: boolean;
  public isGuest: boolean = true;
  public isAdmin: boolean;
  public avaColor: string;

  constructor(
    private router: Router,
    private auth: AuthService
  ){}


  ngOnInit(): void{
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
      this.avaColor = this.colorUtils.setColor(this.username);
    });

    //by default (reload, start new page)
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

    this.username = this.auth.readToken().username;
    this.avaColor = this.colorUtils.setColor(this.username);

  }
  public search(): void{
    this.router.navigate(['posts'], {queryParams:
        {
          content: this.searchString
        }
    });
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


}
