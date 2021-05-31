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
  public avaColor: string;

  constructor(
    private router: Router,
    private auth: AuthService
  ){}


  ngOnInit(): void{
    this.colorUtils = new ColorConverter();
    // listen to emission from login
    this.auth.username.subscribe(u => this.username = u);

    this.username = this.auth.readToken().sub;
    this.avaColor = this.colorUtils.setColor(this.username);
  }
  public search(): void{
    this.router.navigate(['posts'], {queryParams:
        {
          content: this.searchString
        }
    });
  }

  public logout(): void{
    this.auth.logout();
    this.username = null;
    this.router.navigate(['login']);
  }


}
