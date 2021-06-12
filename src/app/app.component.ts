import { Component, OnDestroy, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ColorConverter } from './Utils/ColorConverter';
import { MatSidenav } from "@angular/material/sidenav";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  public title = 'SenecaForum';
  public searchString = '';
  public username: string;
  public isUser: boolean;
  public isGuest: boolean = true;
  public isAdmin: boolean;
  public avaColor: string;
  public open:boolean;

  constructor(
    private router: Router,
    private auth: AuthService
  ){}


  ngOnInit(): void{
    this.open = false;
  }
  public search(): void{
    this.router.navigate(['posts'], {queryParams:
        {
          content: this.searchString
        }
    });
  }

  handleToggleTopNavbar(event){
    this.open = event;
  }




}
