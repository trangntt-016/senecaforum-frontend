import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataManagerService } from '../../data-manager.service';
import { ChipColor, TagsConverter } from '../../Utils/TagsConverter';
import { ContentConverter } from '../../Utils/ContentConverter';
import { PostViewDto } from '../../model/Post';
import { TimeConverter } from '../../Utils/TimeConverter';

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


  constructor(
    private dataService: DataManagerService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.posts = [];
    this.allChipTags = [];
    this.dataService.getHotPosts().subscribe((posts) => {
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
    });
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

  openSnackBar(message: string, action: string): void{

    }

}
