import { User } from './User';

export class Comment{
  constructor() {
    this.commentId = null;
    this.commenter = null;
    this.createdOn = new Date();
    this.content = null;
    this.enabled = false;
  }
  commentId: number;
  createdOn: Date;
  commenter: User;
  content: string;
  enabled: boolean;
}
