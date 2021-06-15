import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navlist',
  templateUrl: './navlist.component.html',
  styleUrls: ['./navlist.component.css']
})
export class NavlistComponent implements OnInit {
  public searchString = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {}

  public search(): void{
    this.router.navigate(['posts'], {queryParams:
        {
          content: this.searchString
        }
    });
    this.searchString = '';
  }


}
