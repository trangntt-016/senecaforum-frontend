import { Role } from './Role';

// tslint:disable-next-line:class-name
export class User {
  constructor(){
    this.userId = '';
    this.username = '';
    this.email = '';
  }
  public userId: string;
  public username: string;
  public email: string;
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

export class payload{
  public sub: string;
  public role: string;
  public exp: number;
}

