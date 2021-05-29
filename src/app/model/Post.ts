import { Topic } from './Topic';
import { User } from './User';
import { Comment } from './Comment';



export class Post{
  constructor(topic: Topic, user: User){
    this.postId = null;
    this.title = null;
    this.comments = null;
    this.createdOn = new Date();
    this.views = 0;
    this.content = null;
    this.tags = '';
    this.topic = topic;
    this.author = user;
}
    postId: number;
    title: string;
    topic: Topic;
    author: User;
    createdOn: Date;
    comments: Comment[];
    tags: string;
    views: number;
    content: string;
}

export class PostViewDto{
  postId: number;
  content: string;
  createdOn: Date;
  tags: string;
  title: string;
  views: number;
  author: User;
  topic: Topic;
  lastComment: Comment;
  noOfComments: number;
}

export class PostSearchDto{
  postId: number;
  title: string;
  content: string;
  idxKeywords: number[];
}


