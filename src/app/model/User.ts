import { Role } from "./Role";

export class User{
  constructor(){
    this.username = null;
    this.userId = null;
    this.createdOn = null;
    this.email = null;
  }
  public userId: string;
  public username: string;
  public createdOn: Date;
  public email: string;
}

export class RegisterUser{
  constructor(){
    this.userId = null;
    this.username = '';
    this.email = '';
    this.password = '';
    this.role = new Role("U");
    this.isRememberMe = false;
    this.createOn = new Date();
  }
  public userId: string;
  public username: string;
  public email: string;
  public password: string;
  public role: Role;
  public isRememberMe: boolean;
  public createOn: Date;
}
