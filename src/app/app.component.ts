import { Component, OnDestroy, OnInit  } from '@angular/core';
import { DataManagerService } from './data-manager.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'SenecaForum';
  searchString = '';

  constructor(
    private dataService: DataManagerService
  ){}

  ngOnInit(): void{

  }


}
