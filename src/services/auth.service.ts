import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private url = "authentication"
  constructor(private http: HttpClient) { }
  public login(user: User): Observable<string>{
  return  this.http.post(`${environment.apiUrl}/${this.url}/login`,user, {responseType: 'text'});
 

  }
}
