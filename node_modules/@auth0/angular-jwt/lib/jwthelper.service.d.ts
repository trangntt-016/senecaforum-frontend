import { HttpRequest } from "@angular/common/http";
import * as ɵngcc0 from '@angular/core';
export declare class JwtHelperService {
    tokenGetter: () => string;
    constructor(config?: any);
    urlBase64Decode(str: string): string;
    private b64decode;
    private b64DecodeUnicode;
    decodeToken<T = any>(token?: string): T;
    getTokenExpirationDate(token?: string): Date | null;
    isTokenExpired(token?: string, offsetSeconds?: number): boolean;
    getAuthScheme(authScheme: Function | string | undefined, request: HttpRequest<any>): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<JwtHelperService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<JwtHelperService>;
}

//# sourceMappingURL=jwthelper.service.d.ts.map