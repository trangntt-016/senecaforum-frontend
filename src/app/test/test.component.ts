import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../model/Post';
import { DataManagerService } from '../data-manager.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})


export class TestComponent implements OnInit {
  private post: Post;
  public img: any;
  constructor(
    private dataService: DataManagerService
  ){}

  ngOnInit(): void {
    this.dataService.getPostByPostId(5).subscribe((post) => {
      this.post = post;
      let content = this.post.content;
      let startIdx = content.indexOf("<figure");
      let imgBlock = content.substr(startIdx);
      let endIdx = imgBlock.indexOf("</figure>");
      this.img = content.substr(startIdx, endIdx);
    })
  }




}




