import { Topic } from './Topic';
import { User } from './User';

export interface Comment{
    commentId: number;
    createdOn: Date;
    commenter: User;
    content: string;
    enabled: boolean;
}

export class Post{
  constructor(topic: Topic, user: User){
    this.postId = null;
    this.title = null;
    this.comments = null;
    this.createdOn = new Date();
    this.views = 0;
    this.content = null;
    this.tags = null;
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

