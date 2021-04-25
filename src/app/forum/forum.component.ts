import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { NgForm } from '@angular/forms';

import * as data from '../data/Topic.json';
import { FilterKeywords } from '../model/FilteredKeywords';



@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  items: MenuItem[];
  filteredKeyword:FilterKeywords;

  ngOnInit(): void {
    // display topics
    this.items = [];
    var topics = data.topics;
    for(var i = 0; i<topics.length; i++){
      var obj = {
        label:topics[i]
      }
      this.items.push(obj);
    }

    // filter
    this.filteredKeyword = {
      searchTag: "",
      fromDate: new Date(),
      updatedDate:"7",
      sortedBy:"titles",
      order:"ascending"
    }
  }

  onSubmit(f: NgForm): void {

  }
  
}