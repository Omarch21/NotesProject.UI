import { Component } from '@angular/core';
import {OnInit} from '@angular/core'
import { NotecardsService } from 'src/services/notecards.service';
import { AuthService } from 'src/services/auth.service';
import { NotecardSet } from 'src/models/notecardset';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private notecardService:NotecardsService, private authService: AuthService){}
  apiset: NotecardSet = {name: "", id: "", notecards: []};
  ngOnInit(){
  //  this.notecardService.getSet().subscribe((set: NotecardSet[])=>{
    //  console.log(set[0].name);

   // })
  //  var ab = this.authService.getAuthToken();
   // console.log(ab);
   //console.log(localStorage.getItem('authToken'))
  }
  title = 'NotesProject';
}
