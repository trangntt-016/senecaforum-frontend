import { NgModule, Optional, SkipSelf, } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from "./jwt.interceptor";
import { JWT_OPTIONS } from "./jwtoptions.token";
import { JwtHelperService } from "./jwthelper.service";
export class JwtModule {
    constructor(parentModule) {
        if (parentModule) {
            throw new Error("JwtModule is already loaded. It should only be imported in your application's main module.");
        }
    }
    static forRoot(options) {
        return {
            ngModule: JwtModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: JwtInterceptor,
                    multi: true,
                },
                options.jwtOptionsProvider || {
                    provide: JWT_OPTIONS,
                    useValue: options.config,
                },
                JwtHelperService,
            ],
        };
    }
}
JwtModule.decorators = [
    { type: NgModule }
];
JwtModule.ctorParameters = () => [
    { type: JwtModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1qd3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1qd3Qvc3JjL2xpYi9hbmd1bGFyLWp3dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFFBQVEsRUFFUixRQUFRLEVBQ1IsUUFBUSxHQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBZSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFvQnZELE1BQU0sT0FBTyxTQUFTO0lBQ3BCLFlBQW9DLFlBQXVCO1FBQ3pELElBQUksWUFBWSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQ2IsNEZBQTRGLENBQzdGLENBQUM7U0FDSDtJQUNILENBQUM7SUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQXlCO1FBQ3RDLE9BQU87WUFDTCxRQUFRLEVBQUUsU0FBUztZQUNuQixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtvQkFDMUIsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLEtBQUssRUFBRSxJQUFJO2lCQUNaO2dCQUNELE9BQU8sQ0FBQyxrQkFBa0IsSUFBSTtvQkFDNUIsT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLFFBQVEsRUFBRSxPQUFPLENBQUMsTUFBTTtpQkFDekI7Z0JBQ0QsZ0JBQWdCO2FBQ2pCO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQXpCRixRQUFROzs7WUFFMkMsU0FBUyx1QkFBOUMsUUFBUSxZQUFJLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBOZ01vZHVsZSxcbiAgTW9kdWxlV2l0aFByb3ZpZGVycyxcbiAgT3B0aW9uYWwsXG4gIFNraXBTZWxmLFxuICBQcm92aWRlcixcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHBSZXF1ZXN0LCBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgSnd0SW50ZXJjZXB0b3IgfSBmcm9tIFwiLi9qd3QuaW50ZXJjZXB0b3JcIjtcbmltcG9ydCB7IEpXVF9PUFRJT05TIH0gZnJvbSBcIi4vand0b3B0aW9ucy50b2tlblwiO1xuaW1wb3J0IHsgSnd0SGVscGVyU2VydmljZSB9IGZyb20gXCIuL2p3dGhlbHBlci5zZXJ2aWNlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSnd0Q29uZmlnIHtcbiAgdG9rZW5HZXR0ZXI/OiAoXG4gICAgcmVxdWVzdD86IEh0dHBSZXF1ZXN0PGFueT5cbiAgKSA9PiBzdHJpbmcgfCBudWxsIHwgUHJvbWlzZTxzdHJpbmcgfCBudWxsPjtcbiAgaGVhZGVyTmFtZT86IHN0cmluZztcbiAgYXV0aFNjaGVtZT86IHN0cmluZyB8ICgocmVxdWVzdD86IEh0dHBSZXF1ZXN0PGFueT4pID0+IHN0cmluZyk7XG4gIGFsbG93ZWREb21haW5zPzogQXJyYXk8c3RyaW5nIHwgUmVnRXhwPjtcbiAgZGlzYWxsb3dlZFJvdXRlcz86IEFycmF5PHN0cmluZyB8IFJlZ0V4cD47XG4gIHRocm93Tm9Ub2tlbkVycm9yPzogYm9vbGVhbjtcbiAgc2tpcFdoZW5FeHBpcmVkPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBKd3RNb2R1bGVPcHRpb25zIHtcbiAgand0T3B0aW9uc1Byb3ZpZGVyPzogUHJvdmlkZXI7XG4gIGNvbmZpZz86IEp3dENvbmZpZztcbn1cblxuQE5nTW9kdWxlKClcbmV4cG9ydCBjbGFzcyBKd3RNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IEp3dE1vZHVsZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJKd3RNb2R1bGUgaXMgYWxyZWFkeSBsb2FkZWQuIEl0IHNob3VsZCBvbmx5IGJlIGltcG9ydGVkIGluIHlvdXIgYXBwbGljYXRpb24ncyBtYWluIG1vZHVsZS5cIlxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgc3RhdGljIGZvclJvb3Qob3B0aW9uczogSnd0TW9kdWxlT3B0aW9ucyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Snd0TW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBKd3RNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLFxuICAgICAgICAgIHVzZUNsYXNzOiBKd3RJbnRlcmNlcHRvcixcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9ucy5qd3RPcHRpb25zUHJvdmlkZXIgfHwge1xuICAgICAgICAgIHByb3ZpZGU6IEpXVF9PUFRJT05TLFxuICAgICAgICAgIHVzZVZhbHVlOiBvcHRpb25zLmNvbmZpZyxcbiAgICAgICAgfSxcbiAgICAgICAgSnd0SGVscGVyU2VydmljZSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19