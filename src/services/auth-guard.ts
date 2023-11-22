import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router,CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import {map,Observable} from 'rxjs'
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    check: boolean = false;
    constructor(private http: HttpClient, private router: Router, private authService:AuthService){}
    canActivate():boolean{
        var t = this.authService.isLoggedIn()
  
    if(t){
    return true;
    }else{
        this.router.navigate(['login']);
    return false;
}
}
}


  

    
