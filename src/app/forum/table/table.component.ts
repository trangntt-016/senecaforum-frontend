import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TimeConverter } from '../../Utils/TimeConverter';
import { DataManagerService } from '../../data-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, PostViewDto } from '../../model/Post';
import { ColorConverter } from '../../Utils/ColorConverter';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../../auth.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  private p: number; // pageidx from url
  private topicID: string;
  private colorUtils;
  public posts: PostViewDto[] = null;
  public isSearching: boolean;
  @Output() noOfPostsEvt = new EventEmitter();

  constructor(
    private dataService: DataManagerService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    const utils = new TimeConverter();
    this.colorUtils = new ColorConverter();
    this.route.params.subscribe(params => {
      this.topicID = params.topicId;
      //reload data when default
      console.log(this.topicID);
      this.dataService.getPostsByTopicId(this.topicID, 1).subscribe(posts => {
        console.log(posts);
        this.posts = posts;
        if (this.posts != null){
          this.noOfPostsEvt.emit(posts.length);
        }
        else{
          this.noOfPostsEvt.emit(0);
        }
      });
    });
    this.route.queryParams.subscribe(params => {
      this.p = params['p'];
      // reload data when filtering
      if(params.hasOwnProperty('s')){
        const tags = params['tags'];
        const start = params['s'];
        let end = params['e'];
        let convertedEnd = utils.plusDate(end);
        const sortBy = params['sortBy'];
        const order = params['order'];
        this.isSearching = true;
        this.dataService.getPostsByTopicIdWithFilter(this.topicID, this.p, tags, start, convertedEnd, sortBy, order)
          .subscribe(posts => {
            this.posts = posts;
            if (this.posts != null){
              this.noOfPostsEvt.emit(posts.length);
            }
            else{
              this.noOfPostsEvt.emit(0);
            }
          })
      }
      else{
        // reload data when default
        this.isSearching = false;
        this.dataService.getPostsByTopicId(this.topicID,this.p).subscribe(posts => {
          this.posts = posts;
          if (this.posts != null){
            this.noOfPostsEvt.emit(posts.length);
          }
          else{
            this.noOfPostsEvt.emit(0);
          }
        }, (error => {
          if (error.status === 403){
            this._snackBar.open('Your login session has expired!', 'Got it!', {duration: 5000});
            this.auth.logout();
            this.router.navigate(['login']);
          }
        }));
      }
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
}
