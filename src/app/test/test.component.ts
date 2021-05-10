import { FormControl, NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, startWith, map } from 'rxjs/operators';
import { FilterKeywords } from '../model/FilteredKeywords';
import { TimeConverter, TimeConverterUtils } from '../forum/Utils/TimeConverter';
import { DataManagerService } from '../data-manager.service';
import { Observable, of } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{
  isDisplayFilter:boolean=false;
  filteredKeyword:FilterKeywords;
  tags;
  currentTag = '';

  constructor(
    private dataService:DataManagerService
  ){}
  ngOnInit(){
    
  }

  handleDisplayFilter(event){
    var targetElement =event.target.attributes[1].value; 
    if(targetElement=="pi pi-filter"){
      if(!this.isDisplayFilter){
        this.isDisplayFilter = true;
      }
      else{
        this.isDisplayFilter = false;
      }      
    }
  }

  doFilter() {
    this.tags = this.dataService.getAllTags()
      .pipe(map(tag => this.filter(tag)),
      )
  }

  filter(values) {
    console.log(values);
    return values.filter(tag => tag.tagName.toLowerCase().includes(this.currentTag))
  }

    onSubmit(f: NgForm): void {
      var utils = new TimeConverter();
  
      f.value.start = utils.convertToYYYYMMDD(f.value.start);
      f.value.end = utils.convertToYYYYMMDD(f.value.end);
  
    };
  
  

}
