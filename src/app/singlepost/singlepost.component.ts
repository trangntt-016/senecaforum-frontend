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
import { AuthService } from '../auth.service';
import { Subscription } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TopicStats } from "../model/Topic";

@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.css']
  // encapsulation: ViewEncapsulation.None
})
export class SinglepostComponent implements OnInit {
  private postId: number;
  private topicId: string;
  private topicSub: Subscription;
  private routeSub: Subscription;
  private postSub: Subscription;
  public post: Post;
  public topic: TopicStats;
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
    private auth: AuthService,
    private _snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.ckConfig = new CkPostConfig().ckCommentConfig;
    const utils = new TagsConverter();
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      this.postId = +params.postId;
      this.topicId = params.topicId;
    });

    this.comment = new Comment();
    this.commenter = new User();
    if(this.auth.readToken()!=null){
      this.commenter.username = this.auth.readToken().username;
      this.comment.commenter = this.commenter;
    }

    this.topicSub = this.dataService.getTopicStats(this.topicId).subscribe((topic) => {
      this.topic = topic;
    },(error => {
      if (error.status === 403){
        this._snackBar.open('Your login session has expired!', 'Got it!');
        this.auth.logout();
        this.router.navigate(['login']);
      }}));

    this.postSub = this.dataService.getPostByPostId(this.postId).subscribe((data) => {
      this.post = data;
      this.comments = data.comments;
      if (data.tags != '' &&data.tags != undefined){
        this.tags = utils.getMatChips(data.tags);
      }

    }, (error => {
      if (error.status === 403){
        this._snackBar.open('Your login session has expired!', 'Got it!');
        this.auth.logout();
        this.router.navigate(['login']);
      }}));
  }

  ngOnDestroy():void{
    this.postSub.unsubscribe();
    this.topicSub.unsubscribe();
    this.routeSub.unsubscribe();
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
          this.comments = comments;
          this.model.editorData = null;
        }, (error => {
          if (error.status === 403){
            this._snackBar.open('Your login session has expired!', 'Got it!');
            this.auth.logout();
            this.router.navigate(['login']);
          }}));
    }
  }

  edit(): void{
    if (this.auth.readToken().username == this.post.author.username){
      this.router.navigate([`users/${this.auth.readToken().userId}/posts/${this.postId}/edit`]);
    }
  }
}
