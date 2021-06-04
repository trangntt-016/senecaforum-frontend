import { Component, OnChanges, OnInit } from '@angular/core';
import { DataManagerService } from '../../data-manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {
  private topicId: string;
  public length: number;

  constructor(
    private dataService: DataManagerService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      this.topicId = params.topicId;
      // update size of page when topicId changes
      this.dataService.getPostsSize(this.topicId).subscribe(size => {
        this.length = size;
      });
      this.router.navigate([`topics/${this.topicId}/posts`], {queryParams: {p: 1}});
    });

  }

  ngOnChanges(): void {
  }

  pageEvent(event): void{
    const pageIdx = event.pageIndex + 1;
    this.router.navigate([`topics/${this.topicId}/posts`], {queryParams: {p: pageIdx}});
  }


}
