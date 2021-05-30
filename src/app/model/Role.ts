export class Role{
  constructor(code: string){
    this.roleId = null;
    this.users = null;
    if(code == "AD"){
      this.roleName = "ROLE_ADMIN";
      this.code = "AD";
    }
    else{
      this.roleName = "ROLE_USER";
      this.code = "U";
    }
  }
  public roleId: number;
  public roleName: string;
  public code: string;
  public users: any;
}
