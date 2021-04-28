import { Component,OnDestroy,OnInit  } from '@angular/core';
import { DataManagerService } from './data-manager.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit, OnDestroy{
  title = 'SenecaForum';
  searchString:string = "";
  sidebars:any[] = new Array;
  private mySub:Subscription

  constructor(
    private dataService:DataManagerService
  ){}

  ngOnInit():void{
    this.mySub = this.dataService.getSideBars().subscribe(data=>{
      data.map((d)=>{
        var obj = {
          name:d,
          url:'/'+this.convertToUrl(d).toLowerCase()
        };
        this.sidebars.push(obj);
      })
    })

  }

  ngOnDestroy():void{
    this.mySub.unsubscribe();
  }

  convertToUrl(d:string){
    var removedSpecialChar = d.trim().replace('?','').replace(/[^a-zA-Z0-9]/g,'-');
    return removedSpecialChar;
  }

}
