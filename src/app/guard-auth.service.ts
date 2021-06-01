import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GuardAuthService  implements CanActivate{

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkLoggin(next, url);
  }

  checkLoggin(route: ActivatedRouteSnapshot, url: any): boolean{
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['/']);
      return false;
    }
    const role = this.auth.getRole();
    if(route.data.role !=role){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
