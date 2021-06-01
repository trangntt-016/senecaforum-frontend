import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DataManagerService } from '../data-manager.service';
import { Post } from '../model/Post';
import { Comment } from '../model/Comment';
import { User } from '../model/User';
import { ChipColor, TagsConverter } from '../Utils/TagsConverter';
import { TimeConverter } from '../Utils/TimeConverter';
import { CkPostConfig } from '../Utils/CkConfig';
import * as ClassicEditor from '../../assets/ckeditor5/build/ckeditor';


import { CommentServiceService } from './comment-service.service';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.css']
  // encapsulation: ViewEncapsulation.None
})
export class SinglepostComponent implements OnInit {
  private postId: number;
  public post: Post;
  public noOfPosts: number;
  public commenter: User;
  public comments: Comment[];
  public comment: Comment;
  public tags: ChipColor[];
  public color = 'primary';

  public Editor = ClassicEditor;
  public ckConfig;
  public model: any = {
    editorData: null,
    enabled: false
  };

  constructor(
    private dataService: DataManagerService,
    private router: Router,
    private commentService: CommentServiceService,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService
  ) { }
  ngOnInit(): void {
    this.ckConfig = new CkPostConfig().ckCommentConfig;

    this.activatedRoute.params.subscribe(params => {
      this.postId = +params.postId;
    });

    this.commenter = new User();
    this.commenter.username = this.auth.readToken().sub; // will get this from localStorage later
    this.comment = new Comment();
    this.comment.commenter = this.commenter;
    const utils = new TagsConverter();

    this.dataService.getPostByPostId(this.postId).subscribe((data) => {
      this.post = data;
      this.comments = data.comments;
      if(data.tags!=''&&data.tags!=undefined){
        this.tags = utils.getMatChips(data.tags);
      }
      this.dataService.getPostsSize(this.post.topic.topicId).subscribe(size => {
        this.noOfPosts = size;
      });
    });
  }

  // handle post table
  convertDateLastComment(convertedDate: Date): string{
    const utils = new TimeConverter();
    return utils.convertDateComment(convertedDate);
  }

  onSubmit(f: NgForm): void {
    if (this.model.editorData != null && this.model.editorData !== ''){
      this.comment.content = this.model.editorData;
      this.comment.enabled = this.model.enabled;
      this.commentService.createNewComment(this.comment, this.post.postId).subscribe(
        (comments) => {
          console.log(comments);
          this.comments = comments;
          this.model.editorData = null;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  edit(): void{
    if (this.auth.readToken().sub == this.post.author.username){
      this.router.navigate(['posts', this.post.postId,'edit']);
    }
  }
}
