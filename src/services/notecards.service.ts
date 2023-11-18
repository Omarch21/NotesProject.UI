import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { NotecardSet } from 'src/models/notecardset';
import { environment } from 'src/environment/environment';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotecardsService {
private url = "Notecard"
  constructor(private http:HttpClient) { }
  public getSet(): Observable<NotecardSet[]>{
    return this.http.get<NotecardSet[]>(`${environment.apiUrl}/${this.url}`);
   
  }
}
