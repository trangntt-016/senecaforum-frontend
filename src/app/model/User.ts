import { Role } from './Role';

// tslint:disable-next-line:class-name
export class pUser {
  constructor(){
    this.userId = '';
    this.username = '';
    this.email = '';
  }
  public userId: string;
  public username: string;
  public email: string;
}
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

export class AuthUser extends pUser{
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

export class LogInUser extends pUser{
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

export class payload{
  public sub: string;
  public role: string;
  public exp: number;
}

