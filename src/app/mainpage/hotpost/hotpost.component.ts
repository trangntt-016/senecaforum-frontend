import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataManagerService } from '../../data-manager.service';
import { ChipColor, TagsConverter } from '../../Utils/TagsConverter';
import { ContentConverter } from '../../Utils/ContentConverter';
import { PostViewDto } from '../../model/Post';
import { TimeConverter } from '../../Utils/TimeConverter';
import { MainpageService } from "../mainpage.service";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";

@Component({
  selector: 'app-hotpost',
  templateUrl: './hotpost.component.html',
  styleUrls: ['./hotpost.component.css']
})
export class HotpostComponent implements OnInit {
  private tagUtils = new TagsConverter();
  private contentUtils = new ContentConverter();
  private tags: ChipColor[];
  private snackBar: MatSnackBar;
  public posts: PostViewDto[];
  public content: string;
  public value: string;
  public allChipTags: any;
  public color = 'primary';
  public noOfLoads: number;
  public noOfAllPosts: number;


  constructor(
    private dataService: DataManagerService,
    private _snackBar: MatSnackBar,
    private mainPageService: MainpageService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.noOfLoads = 1;
    this.posts = [];
    this.allChipTags = [];
    this.dataService.getNoOfAllPosts().subscribe((size) => {
      this.noOfAllPosts = size;
    }, (error => {
      if (error.status === 403){
        this._snackBar.open('Your login session has expired!','Got it!');
        this.auth.logout();
        this.router.navigate(['login']);
      }
    }));
    this.dataService.getHotPosts(this.noOfLoads).subscribe((posts) => {
      this.posts = posts;
      this.posts.forEach(post => {
        if (post.content.indexOf('figure') >= 0){
          const rawContent = post.content;
          const resized = this.contentUtils.resizeImg(rawContent);

          const modified = resized.replace('width:50', 'width:30');
          post.content = modified;
          const content = this.contentUtils.getFirstImg(post.content);
          post.content = content;
        }
        else{
          const content = this.contentUtils.getDisplayText(post.content, 3, post.postId);
          post.content = content;
        }
        this.value = 'http://localhost:4200/posts/' + post.postId;
        this.tags = this.tagUtils.getMatChips(post.tags);
        this.allChipTags.push(this.tags);
      });
    }, (error => {
      if (error.status === 403){
        this._snackBar.open('Your login session has expired!','Got it!');
        this.auth.logout();
        this.router.navigate(['login']);
      }
    }));
  }

  // handle post table
  convertDateLastComment(convertedDate: Date): string{
    const utils = new TimeConverter();
    return utils.convertDateComment(convertedDate);
  }

  convertToTagChips(tags: string): ChipColor[]{
    return this.tagUtils.getMatChips(tags);
  }

  setValueCopy(index): void{
    const post = this.posts[index];
    this.value = 'http://localhost:4200/posts/' + post.postId;
    this._snackBar.open("Double click and...", "Copied", { duration: 1200 });
  }

  updateViews(postId: number): void{
    this.mainPageService.updateViews(postId);
  }

  loadmore(): void{
    if((this.noOfLoads-1) *10+10 < this.noOfAllPosts){
      this.noOfLoads += 1;
      this.dataService.getHotPosts(this.noOfLoads).subscribe((loaded) => {
        let temp = new Array(this.posts.length + loaded.length);
        temp = [...this.posts, ...loaded];
        this.posts = new Array(temp.length);
        this.posts = temp;
      });
    };
  }


}
