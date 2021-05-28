import { Component, OnInit } from '@angular/core';
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
  public posts: PostViewDto[];
  public content: string;
  public value: string;
  public tags: ChipColor[];
  public color = 'primary';


  constructor(
    private dataService: DataManagerService
  ) { }

  ngOnInit(): void {
    this.posts = [];
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

  setValueCopy(index){
    let post = this.posts[index];
    this.value = 'http://localhost:4200/posts/' + post.postId;
    console.log(this.value);
  }

}
