import { Component, OnDestroy, OnInit  } from '@angular/core';
import { DataManagerService } from './data-manager.service';
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'SenecaForum';
  searchString = '';

  constructor(
    private router: Router
  ){}

  ngOnInit(): void{

  }
  search(): void{
    this.router.navigate(['posts'], {queryParams:
        {
          content: this.searchString
        }
    });
  }


}
