import { FormControl, NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, startWith, map } from 'rxjs/operators';
import { FilterKeywords } from '../model/FilteredKeywords';
import { TimeConverter, TimeConverterUtils } from '../Utils/TimeConverter';
import { DataManagerService } from '../data-manager.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent{
  color = 'accent';
  checked = false;

  changed(){
    console.log(this.checked);
  }

}
