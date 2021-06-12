import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { JwtHelperService } from "./jwthelper.service";
import { Observable } from "rxjs";
export declare class JwtInterceptor implements HttpInterceptor {
    jwtHelper: JwtHelperService;
    private document;
    tokenGetter: (request?: HttpRequest<any>) => string | null | Promise<string | null>;
    headerName: string;
    authScheme: string | ((request?: HttpRequest<any>) => string);
    allowedDomains: Array<string | RegExp>;
    disallowedRoutes: Array<string | RegExp>;
    throwNoTokenError: boolean;
    skipWhenExpired: boolean;
    standardPorts: string[];
    constructor(config: any, jwtHelper: JwtHelperService, document: Document);
    isAllowedDomain(request: HttpRequest<any>): boolean;
    isDisallowedRoute(request: HttpRequest<any>): boolean;
    handleInterception(token: string | null, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
