import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { MenuItem } from 'primeng/api';
import { DataManagerService } from '../../data-manager.service';
import { Topic} from '../../model/Topic';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public topics$: Observable<Topic[]>;
  public items: MenuItem[];
  public isMobile: boolean;
  private mySub: Subscription;

  posts: any[] = null;
  constructor(
    private dataService: DataManagerService,
    public bpObserve: BreakpointObserver,
    private router: Router
  ){}


  ngOnInit(): void {
    this.isMobile = false;
    this.bpObserve.observe([
      '(max-width: 415px)'
    ]).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

    this.topics$ = this.dataService.getAllTopics();
  }

  isActive(url){
    return this.router.url.includes(url);
  }

}
