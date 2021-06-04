import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DataManagerService } from '../../data-manager.service';
import { PostViewDto } from '../../model/Post';
import { ViewUser } from '../../model/User';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeConverter } from "../../Utils/TimeConverter";
import { Subscription } from "rxjs";
import { AuthService } from "../../auth.service";


@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent implements OnInit, OnChanges{
  private dataSub: Subscription;
  @Input()user: ViewUser;
  @Output()noOfPendingPosts: EventEmitter<number> = new EventEmitter();
  public posts: PostViewDto[];
  constructor(
    public dialog: MatDialog,
    private dataService: DataManagerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit(): void{
    if(this.user != null){
      this.dataSub = this.dataService.getPostsByUserId(this.user.userId).subscribe(p => {
        this.posts = p;
        let noOfPending = p.filter(po => po.status == 'pending').length;
        this.noOfPendingPosts.emit(noOfPending);
      });
    }

  }
  ngOnChanges(): void{
    if(this.user != null){
      this.dataSub = this.dataService.getPostsByUserId(this.user.userId).subscribe(p => {
        this.posts = p;
        let noOfPending = p.filter(po => po.status == 'pending').length;
        this.noOfPendingPosts.emit(noOfPending);
      });
    }

  }

  ngOnDestroy():void{
    this.dataSub.unsubscribe();
  }

  openDialog(index): void{
    let selectedPost = this.posts[index];
    this.dialog.open(DialogElements).afterClosed().subscribe(res => {
      if (res == true){
        this.dataService.deleteAPost(selectedPost.postId, this.user.userId).subscribe(result => {
          let tempPosts = this.posts;
          tempPosts.splice(index,1);
          this.posts = tempPosts;
        }, (error => console.log(error)));
      }
    });
  }

  navigateEdit(index): void{
    this.router.navigate([`users/${this.user.userId}/posts/${this.posts[index].postId}/edit`]);
  }

  // handle post table
  convertDateLastComment(convertedDate: Date): string{
    const utils = new TimeConverter();
    return utils.convertDateComment(convertedDate);
  }

}

@Component({
  selector: 'app-dialog-elements',
  templateUrl: './dialog-elements.html',
})
export class DialogElements {}

