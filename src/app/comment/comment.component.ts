import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { TimeConverter } from '../Utils/TimeConverter';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnChanges {
  @Input() comments: Comment[];
  @ViewChild('tabGroup')
  tabGroup;

  private page: number;
  private pageSize: number;
  private slicingComments: Comment[];

  public tabs = null;

  constructor() { }

  ngOnInit(): void {
    this.page = 0;
    this.pageSize = 5;
    let size = Math.floor(this.comments.length/this.pageSize);
    if(this.comments.length > 0 && size === 0){
      size = 1;
    }
    if(!isNaN(size)){
      this.tabs = Array.from(Array(size).keys());
      this.slicingComments = this.comments.slice(this.page * this.pageSize, this.page * this.pageSize + this.pageSize);
    }
  }

  ngOnChanges(): void{
    let size = Math.floor(this.comments.length/this.pageSize);
    if(this.comments.length > 0 && size === 0){
      size = 1;
    }
    if(!isNaN(size)){
      this.tabs = Array.from(Array(size).keys());
      this.slicingComments = this.comments.slice(this.page * this.pageSize, this.page * this.pageSize + this.pageSize);
    }

  }

  scrollTabs(event): void{
    const children = this.tabGroup._tabHeader._elementRef.nativeElement.children;
    const back = children[0];
    const forward = children[2];
    if (event.deltaY > 0) {
      forward.click();
    } else {
      back.click();
    }
  }

  setPage(pageIdx): void{
    this.page = pageIdx;
    this.slicingComments = this.comments.slice(this.pageSize * pageIdx, this.pageSize * pageIdx + this.pageSize);
  }

  // handle post table
  convertDateLastComment(convertedDate: Date): string{
    const utils = new TimeConverter();
    return utils.convertDateComment(convertedDate);
  }
}
