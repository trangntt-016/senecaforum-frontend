export class FilterKeywords{
    "searchTag": string;
    "start": Date;
    "end": Date;
    "updatedDate": string;
    "sortedBy":string;
    "order":string
   }

   export interface User{
    avatarUrl: string;
    name:string;
    discord:string;
    joinOn:Date;
    role:string;
    noOfPosts:number;
    noOfReplies:number;
  
  }
  export interface Post {
    author:User;
    title: string;
    createOn:Date;
    noOfReplies: number;
    lastReplyOn:string;
    replier:User;
  }