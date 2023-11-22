import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable,catchError,map,tap, throwError,of,BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/models/registerUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private url = "authentication"
private userUrl = "GetUser"
user: User | null = null;
  constructor(private http: HttpClient,private router: Router) { }
  private loginStatus = new BehaviorSubject<boolean>(this.isLoggedIn());
private username = new BehaviorSubject<string>(localStorage.getItem('username')!);
  public login(user: User): Observable<any>{
 
    return  this.http.post(`${environment.apiUrl}/${this.url}/login`,user,{withCredentials: true}).pipe(
      tap(()=>{
      
        this.router.navigate(['/dashboard'])
      })
    );

  }
public register(user: RegisterUser): Observable<any>{
  return this.http.post(`${environment.apiUrl}/${this.url}/register`,user);
}
  public getUser(): Observable<any>{
    return this.http.get('https://localhost:7294/test',{responseType:'json'});
  }
  public endpointTest(): Observable<string>{
    return this.http.get('https://localhost:7294/test', {withCredentials: true, responseType: 'text'});
  }
  public checkLoggedInUser(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/${this.url}/CheckUserLoggedIn`, {withCredentials:true, responseType: 'json'});
  }
  public isUserLoggedIn(): Observable<boolean>{
    return this.http.get(`${environment.apiUrl}/${this.url}/CheckUserLoggedIn`, {withCredentials:true, responseType: 'json'})
    .pipe(
      map((response:any) => {console.log(response);return response.success === true}),
      catchError((error)=>{
        if (error.status === 400){
          return [false];
        }else
        {
          console.error('Error checking status')
          return throwError(error)
        }
      })

    );
  }
  refreshToken(): Observable<any>{
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.get(`${environment.apiUrl}/${this.url}/RefreshToken`, {headers: header, withCredentials: true})
  }
  revokeToken(): Observable<any>{
    const encoded = encodeURIComponent(this.username.value);
   const header = new HttpHeaders().set('Content-type', 'application/json');
   console.log(`${environment.apiUrl}/${this.url}/RevokeToken/`+this.username.value);
    return this.http.delete(`${environment.apiUrl}/${this.url}/RevokeToken/`+encoded,{headers: header,withCredentials:true} )
  }

  isLoggedIn():boolean{
    if(localStorage.getItem('token')!= null){
      return true
    }else{
      return false;
    }
  }


  logout(): void{
    const enc = encodeURIComponent(this.username.value);
  console.log(`${environment.apiUrl}/${this.url}/RevokeToken/`+enc);
  localStorage.removeItem("token"); 
  localStorage.removeItem("username");//if it stops working remove this
  this.http.delete(`${environment.apiUrl}/${this.url}/RevokeToken/`+enc,{withCredentials:true}).subscribe((data)=>{
    console.log(data);
  });
  this.http.delete('https://localhost:7294/api/authentication/logout',{withCredentials: true}).subscribe((data)=>{
    console.log("logout",data);
  });
  }

  }
  


