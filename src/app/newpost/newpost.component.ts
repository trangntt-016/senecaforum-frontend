import { Component, OnInit } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import * as ClassicEditor from '../../assets/ckeditor5/build/ckeditor';
import { CkPostConfig } from '../Utils/CkConfig';
import { Post } from '../model/Post';
import { User } from '../model/User';
import { Topic } from '../model/Topic';

import { DataManagerService } from '../data-manager.service';
import { AuthService } from '../auth.service';

export class EditorPost{
  constructor() {
    this.topicId = '';
    this.title = null;
    this.tags = null;
    this.editorData = null;
  }
  topicId: string;
  title: string;
  tags: string;
  editorData: string;
}

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})

export class NewpostComponent implements OnInit {
  private postId: number;
  private user: User;
  private topic: Topic;
  public topics: Topic[];
  private post: Post;
  public Editor = ClassicEditor;
  public ckConfig;
  public model: EditorPost;
  public warning: string;
  public success: boolean;
  public loading: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataManagerService,
    private auth: AuthService
  ){}

  ngOnInit(): void {
    this.model = new EditorPost();
    this.user = new User();
    // will get this from local storage later
    this.user.username = this.auth.readToken().sub;
    this.topic = new Topic();
    this.post = new Post(this.topic, this.user);

    this.warning = null;
    this.success = false;
    this.loading = false;

    this.dataService.getAllTopics().subscribe(topics => {
      this.topics = topics;
    });
    this.activatedRoute.params.subscribe(params => {
      this.postId = +params.postId;
    });

    if (isNaN(this.postId)){
      this.ckConfig = new CkPostConfig().ckNewConfig;
    }
    else{
      this.ckConfig = new CkPostConfig().ckEditConfig;
      this.dataService.getPostByPostId(this.postId).subscribe(
        (post) => {
          this.user = post.author;
          this.post = post;
          this.model.topicId = post.topic.topicId;
          this.model.editorData = post.content;
          this.model.tags = post.tags;
          this.model.title = post.title;
          },
        (err) => {
          console.log(err);
        }
      );
    }
  }



  public onChange( { editor }: ChangeEvent ) {
    const data = editor.getData();
  }

  onSubmit(f: NgForm): void {
    const utils = new NewPostUtils();
    const hashTagsWarning = utils.isHashTagsValid(this.model.tags);
    // tslint:disable-next-line:triple-equals
    if (hashTagsWarning != 'success'){
      this.warning = hashTagsWarning;
    }
    else if(this.model.editorData != null){
      this.loading = true;
      // create new PostDto
      this.post.topic = utils.getTopicFromTopicId(this.model.topicId, this.topics);
      this.post.content = this.model.editorData;
      this.post.tags = this.model.tags;
      this.post.title = this.model.title;
      if(isNaN(this.postId)){
        this.dataService.createNewPost(this.post).subscribe(
          (success) => {
            this.loading = false;
            this.success = true;
            this.warning = null;
            this.router.navigate(['topics',success.topic.topicId,'posts', success.postId]);
          },
          (err) => {
            this.success = false;
            this.loading = false;
            console.log(err);
          }
        );
      }
      else{
        this.dataService.editAPost(this.post).subscribe(
          (success) => {
            this.loading = false;
            this.success = true;
            this.warning = null;
            this.router.navigate(['posts', success.postId]);
          },
          (err) => {
            this.success = false;
            this.loading = false;
            console.log(err);
          }
        );
      }
    }
  }
}

export class NewPostUtils{
  isHashTagsValid(hashtags: string): string{

    if (hashtags === null || hashtags === ''){
      return 'success';
    }
    if (hashtags.indexOf('#') < 0){
      return 'Hashtags must start with #';
    }
    let tokens = hashtags.split('#');
    tokens.shift();
    tokens = tokens.map(t => t.trim());
    for (let i = 0; i < tokens.length; i++){
      if (tokens[i].indexOf(' ') > 0){
        return 'Hashtags cannot contain whitespace.';
      }
      else if (tokens[i].search(/[+!()[;.\]*\\]/) > 0){
        return 'Hashtags cannot contain other special characters than \'#\'.';
      }
    }
    return 'success';
  }


  getTopicFromTopicId(id: string, topics: Topic[]): Topic{
    return topics.filter(t => t.topicId === id)[0];
  }
}


