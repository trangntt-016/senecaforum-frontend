import { Component, OnInit } from '@angular/core';
import { PostSearchDto } from "../../model/Post";
import { DataManagerService } from "../../data-manager.service";
import { ActivatedRoute } from "@angular/router";
import { ContentConverter } from "../../Utils/ContentConverter";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public keyword: string;
  private utils = new ContentConverter();
  public posts: PostSearchDto[];
  constructor(
    private dataService: DataManagerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.keyword = params.content;
      // reload data when default
      this.dataService.searchPostsByContent(this.keyword).subscribe(posts => {
        this.posts = posts;
        posts.forEach(p =>{

          let startSpan = p.content.slice(0,p.idxKeywords[0])+"<span class=\"highlight\">";
          let endSpan = "</span>"+p.content.slice(p.idxKeywords[1]);
          let newContent = startSpan+p.content.slice(p.idxKeywords[0],p.idxKeywords[1])+endSpan;
          p.content = newContent;
        })
      });
    });
  }

}
