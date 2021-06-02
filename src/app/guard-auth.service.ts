import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { DataManagerService } from "./data-manager.service";

@Injectable({
  providedIn: 'root'
})
export class GuardAuthService  implements CanActivate{

  constructor(
    private auth: AuthService,
    private router: Router,
    private dataService: DataManagerService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkLoggin(next, url);
  }


  checkLoggin(route: ActivatedRouteSnapshot, url: any): boolean{
    // check if loggin
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['/']);
      return false;
    }
    // check if they have permission to visit that route
    const role = this.auth.getRole();
    if(route.data.role != role){
      this.router.navigate(['/']);
      return false;
    }
    // check if their credentials matches, they cannot visit other's dashboards
    const userId = this.auth.readToken().userId;
    const urlUserId = route.params.userId;
    if (userId !== urlUserId){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }


}
