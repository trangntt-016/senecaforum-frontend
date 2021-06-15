import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class InterceptTokenService   implements HttpInterceptor{

  constructor(
    private auth: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.getToken()==null) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer `
        }
      });
    }
    else{
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });
      }
    // Pass the request on to the next handler
    return next.handle(req);
  }
}
