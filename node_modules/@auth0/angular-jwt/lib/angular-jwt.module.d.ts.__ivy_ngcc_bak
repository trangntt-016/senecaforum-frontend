import { ModuleWithProviders, Provider } from "@angular/core";
import { HttpRequest } from "@angular/common/http";
export interface JwtConfig {
    tokenGetter?: (request?: HttpRequest<any>) => string | null | Promise<string | null>;
    headerName?: string;
    authScheme?: string | ((request?: HttpRequest<any>) => string);
    allowedDomains?: Array<string | RegExp>;
    disallowedRoutes?: Array<string | RegExp>;
    throwNoTokenError?: boolean;
    skipWhenExpired?: boolean;
}
export interface JwtModuleOptions {
    jwtOptionsProvider?: Provider;
    config?: JwtConfig;
}
export declare class JwtModule {
    constructor(parentModule: JwtModule);
    static forRoot(options: JwtModuleOptions): ModuleWithProviders<JwtModule>;
}
