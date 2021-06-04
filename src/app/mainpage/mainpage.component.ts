import { Component, OnInit } from '@angular/core';
import { Post } from '../model/Post';
import { DataManagerService } from '../data-manager.service';
import { TimeConverter } from '../Utils/TimeConverter';
import { ChipColor, TagsConverter } from '../Utils/TagsConverter';
import { ContentConverter } from '../Utils/ContentConverter';
import { ActivatedRoute } from "@angular/router";
import { MainpageService } from "./mainpage.service";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  public searchType: string;
  public post: Post;
  public content: string;
  public value: string;
  public tags: ChipColor[];
  public color = 'primary';

  constructor(
    private dataService: DataManagerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let paramsName = Object.keys(this.activatedRoute.snapshot.queryParams);
    if(paramsName.length != 0){
      this.searchType = paramsName[0];
    }
  }

}
