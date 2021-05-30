import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TimeConverter } from '../../Utils/TimeConverter';
import { DataManagerService } from '../../data-manager.service';
import { ActivatedRoute } from '@angular/router';
import { PostViewDto } from "../../model/Post";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  private p: number; // pageidx from url
  private topicID: number;
  public posts: PostViewDto[] = null;

  constructor(
    private dataService: DataManagerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.topicID = params.topicId;
      // reload data when default
      this.dataService.getPostsByTopicId(this.topicID, 1).subscribe(posts => {
        this.posts = posts;
      });
    });
    this.route.queryParams.subscribe(params => {
      this.p = params['p'];
      const tags = params['tags'];
      const start = params['s'];
      const end = params['e'];
      const sortBy = params['sortBy'];
      const order = params['order'];
      // reload data when filtering
      if (order !== '' && order !== undefined){
        this.dataService.getPostsByTopicIdWithFilter(this.topicID, this.p, tags, start, end, sortBy, order)
          .subscribe(posts => {
            this.posts = posts;
          })
      }
      else{
        // reload data when default
        console.log(this.p);
        this.dataService.getPostsByTopicId(this.topicID,this.p).subscribe(posts => {
          this.posts = posts;
        });
      }
    });
  }

  // handle post table
  convertDateLastComment(convertedDate: Date): string{
    const utils = new TimeConverter();
    return utils.convertDateComment(convertedDate);
  }
}
