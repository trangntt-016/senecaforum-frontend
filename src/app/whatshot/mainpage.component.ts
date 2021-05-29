import { Component, OnInit } from '@angular/core';
import { Post } from '../model/Post';
import { DataManagerService } from '../data-manager.service';
import { TimeConverter } from '../Utils/TimeConverter';
import { ChipColor, TagsConverter } from '../Utils/TagsConverter';
import { ContentConverter } from "../Utils/ContentConverter";

@Component({
  selector: 'app-whatshot',
  templateUrl: './whatshot.component.html',
  styleUrls: ['./whatshot.component.css']
})
export class WhatshotComponent implements OnInit {
  private postId: number;
  private tagUtils = new TagsConverter();
  private contentUtils = new ContentConverter();
  public post: Post;
  public content: string;
  public value: string;
  public tags: ChipColor[];
  public color = 'primary';

  constructor(
    private dataService: DataManagerService
  ) { }

  ngOnInit(): void {
    this.dataService.getPostByPostId(5).subscribe((data) => {
      this.post = data;
    });
  }

  // handle post table
  convertDateLastComment(convertedDate: Date): string{
    const utils = new TimeConverter();
    return utils.convertDateComment(convertedDate);
  }

}
