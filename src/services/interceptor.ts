import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Router,CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import {map,Observable,catchError,of,throwError} from 'rxjs'
import { HttpInterceptor } from "@angular/common/http";
@Injectable(

)
export class Interceptor implements HttpInterceptor{
    constructor(private inject: Injector, private router: Router){}
    ctr = 0;

    intercept(req: HttpRequest<any>,next: HttpHandler):Observable<HttpEvent<any>>{
return next.handle(req).pipe(catchError(x=> this.handleAuthError(x)))
    }
    private handleAuthError(err: HttpErrorResponse): Observable<any>{
        if(err&& err.status === 401 && this.ctr!=1){
            this.ctr++;
            let service = this.inject.get(AuthService);
            service.refreshToken().subscribe({
                next: (x:any)=>{
                    console.log("Tokens refreshed");
                    return of("we refreshed the token try again");
                },
                error: (err:any) =>{
                    service.revokeToken().subscribe({
                        next: (x:any)=>{
                            this.router.navigateByUrl('/');
                            return of(err.message);
                        }
                    });
                }
            })
            return of("Attempting to Refresh Tokens");
        }else{
            this.ctr = 0;
            return throwError(()=> new Error("error"));
        }
    }
}