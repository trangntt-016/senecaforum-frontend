export class Topic{
  constructor() {
    this.topicId = null;
    this.topicName = null;
    this.views = 0;
    this.posts = null;
  }
    public topicId: number;
    public topicName: string;
    public views: number;
    public posts: any[];
  }

export class TopicStats{
  public topicId: number;
  public topicName: string;
  public views: number;
  public noOfPosts: number;
  public noOfComments;
}
