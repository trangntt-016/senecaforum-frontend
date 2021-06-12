import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnChanges {
  @Input()open:boolean;
  public searchString = '';

  constructor(
    private router: Router
  ) { }

  ngOnChanges(){
    console.log(this.open);
  }

  ngOnInit(): void {
  }

  public search(): void{
    this.router.navigate(['posts'], {queryParams:
        {
          content: this.searchString
        }
    });
  }


}
