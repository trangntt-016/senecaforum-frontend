import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../model/Post';
import { DataManagerService } from '../data-manager.service';
import { ProductService } from "./productservice";
import { Topic } from "../model/Topic";

export interface Product {
  id?:string;
  code?:string;
  name?:string;
  description?:string;
  price?:number;
  quantity?:number;
  inventoryStatus?:string;
  category?:string;
  image?:string;
  rating?:number;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})


export class TestComponent implements OnInit {
  topics: Topic[];

  constructor(private dataService: DataManagerService) { }

  ngOnInit() {
    this.dataService.getAllTopics().subscribe(topics=>{
      this.topics = topics;
    })
  }
}




