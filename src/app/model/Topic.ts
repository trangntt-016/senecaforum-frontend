export class Topic{
  constructor() {
    this.topicId = null;
    this.topicName = null;
    this.topicDesc = "";
    this.views = 0;
    this.posts = null;
  }
    public topicId: string;
    public topicName: string;
    public topicDesc: string;
    public views: number;
    public posts: any[];
  }

export class TopicStats extends  Topic{
  constructor() {
    super();
    this.noOfPosts = 0;
    this.noOfComments = 0;
  }
  public noOfPosts: number;
  public noOfComments;
}
