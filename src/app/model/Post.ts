import { Topic } from "./Topic";

export interface User{
    userId:number;
    username:number;
    createdOn: Date;
    discord:string;
    email:string;
}

export interface Comment{
    commentId: number;
    createdOn:Date;
    commenter:User;
}

export interface Post{
    postId:number;
    title:string;
    topic:Topic;
    author:User;
    createdOn: Date;
    comments:Comment[];
    tags:string;
    views:number
}

