import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable,catchError,map,tap, throwError,of } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private url = "authentication"
private userUrl = "GetUser"

  constructor(private http: HttpClient,private router: Router) { }

  public login(user: User): Observable<any>{
 
    return  this.http.post(`${environment.apiUrl}/${this.url}/login`,user,{withCredentials: true}).pipe(
      tap(()=>{
      
        this.router.navigate(['/dashboard'])
      })
    );

  }

  public getUser(): Observable<any>{
    return this.http.get('https://localhost:7294/test');
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

  logout(): Observable<any>{
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.delete(`${environment.apiUrl}/${this.url}/logout`, {headers: header, withCredentials: true})
}
  }
  


