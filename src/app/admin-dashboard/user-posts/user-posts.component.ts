import { Component, Input, OnInit } from '@angular/core';
import { ViewUser } from '../../model/User';
import { PostViewDto } from '../../model/Post';
import { MatDialog } from '@angular/material/dialog';
import { DataManagerService } from '../../data-manager.service';
import { Router } from '@angular/router';
import { TimeConverter } from '../../Utils/TimeConverter';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  @Input()admin: ViewUser;
  public posts: PostViewDto[];
  public selectedPostIds: number[];
  public length: number;
  public pageSize: number;
  public pageIndex;
  public slicingPosts: PostViewDto[];
  constructor(
    public dialog: MatDialog,
    private dataService: DataManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pageSize = 5;
    this.pageIndex = 0;
    this.selectedPostIds = [];
    this.dataService.getAllPostsOrderByStatus().subscribe(p=>{
      this.posts = p;
      this.length = p.length;
      this.slicingPosts = this.posts.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
    })

  }

  // handle post table
  convertDateLastComment(convertedDate: Date): string{
    const utils = new TimeConverter();
    return utils.convertDateComment(convertedDate);
  }

  onChange(id: number):void{
    if(this.selectedPostIds.indexOf(id) > -1){
      const index = this.selectedPostIds.indexOf(id);
      this.selectedPostIds.splice(index,1);
    }
    else{
      this.selectedPostIds.push(id);
    }
    console.log(this.selectedPostIds);
  }

  handlePageEvent(event: PageEvent): void{
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.slicingPosts = this.posts.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
    this.selectedPostIds = [];
  }

  acceptAll(): void{
    this.dataService.updateStatusPosts(this.selectedPostIds,'accepted').subscribe(p => {
      this.posts = p;
      this.slicingPosts = this.posts.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
    })
  }

}
