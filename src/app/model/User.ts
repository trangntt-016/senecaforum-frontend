import { Role } from './Role';

// tslint:disable-next-line:class-name
export class User {
  constructor(){
    this.userId = '';
    this.username = '';
    this.email = '';
    this.isRememberMe = false;
  }
  public userId: string;
  public username: string;
  public email: string;
  public isRememberMe: boolean;
}
export class ViewUser extends User{
  constructor(){
    super();
    this.createdOn = null;
  }
  public createdOn: Date;
}

export class AuthUser extends User{
  constructor(code: string){
    super();
    this.password = '';
    this.role = new Role(code);
    this.isRememberMe = false;
    this.createdOn = new Date();
  }
  public createdOn: Date;
  public password: string;
  public role: Role;
  public isRememberMe: boolean;
}

export class LogInUser extends User{
  constructor(){
    super();
    this.password = '';
    this.role = null;
    this.isRememberMe = false;
  }
  public password: string;
  public role: Role;
  public isRememberMe: boolean;
}

export class Payload{
  public sub: string;
  public userId: string;
  public role: string;
  public exp: number;
}

export class OnlineUserDto {
  constructor(userId: string, username: string){
    this.userId = userId;
    this.username = username;
    this.sessionId = null;
    this.noOfNewMessages = 0;
  }
  public userId: string;
  public sessionId: string;
  public username: string;
  public noOfNewMessages: number;
}

