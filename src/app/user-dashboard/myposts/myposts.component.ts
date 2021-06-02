import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DataManagerService } from '../../data-manager.service';
import { PostViewDto } from '../../model/Post';
import { ViewUser } from '../../model/User';
import { Router } from '@angular/router';
import { TimeConverter } from "../../Utils/TimeConverter";


@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent implements OnInit{
  @Input()user: ViewUser;
  public posts: PostViewDto[];
  constructor(
    public dialog: MatDialog,
    private dataService: DataManagerService,
    private router: Router
  ) {}

  ngOnInit(): void{
    this.dataService.getPostsByUserId(this.user.userId).subscribe(p => {
      this.posts = p;
    });
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
    this.router.navigate([`/posts/${this.posts[index].postId}/edit`]);
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

