import { Component, OnInit } from '@angular/core';
import { TimeConverter } from '../../Utils/TimeConverter';
import { DataManagerService } from '../../data-manager.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PostViewDto } from '../../model/Post';
import { ColorConverter } from '../../Utils/ColorConverter';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AuthService} from '../../auth.service';
import { URLUtils } from '../../Utils/URLUtils';
import { QueryParams } from '../../model/QueryParams';
import { combineLatest, Observable } from 'rxjs';
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  private colorUtils;
  p: number; // pageidx from url
  posts: PostViewDto[] = null;
  isSearching: boolean;
  paramUtils: URLUtils;
  queryParams: QueryParams;
  length: number;
  previous: string;

  constructor(
    private dataService: DataManagerService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    const urlUtils = new URLUtils();

    this.colorUtils = new ColorConverter();

    // initialize
    this.queryParams = urlUtils.extractTopicIdAndQueryParamsFromActivatedRoute(this.activatedRoute.snapshot.params, this.activatedRoute.snapshot.queryParams);

    this.dataService.getPostsByTopicIdWithFilter(this.queryParams).subscribe(result => {
      this.posts = result.posts;
      this.length = result.noOfPosts;
    });


    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(url => {
      this.queryParams = urlUtils.extractTopicIdAndQueryParamsFromRouter(url['urlAfterRedirects']);

      this.dataService.getPostsByTopicIdWithFilter(this.queryParams).subscribe(result => {
        this.posts = result.posts;
        this.length = result.noOfPosts;
      }, (error => {
        if (error.status === 403){
          this._snackBar.open('Your login session has expired!', 'Got it!');
          this.auth.logout();
          this.router.navigate(['login']);
        }}));
    });
  }

  // handle post table
  convertDateLastComment(convertedDate: Date): string{
    const utils = new TimeConverter();
    return utils.convertDateComment(convertedDate);
  }

  public setColor(username: string): void{
    return this.colorUtils.setColor(username);
  }

  pageEvent(event): void{
    const pageIdx = event.pageIndex + 1;
    this.router.navigate([`topics/${this.queryParams.topicId}/posts`], {queryParams: {p: pageIdx}});
  }
}
