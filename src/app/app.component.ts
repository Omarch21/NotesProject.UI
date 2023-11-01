import { Component } from '@angular/core';
import {OnInit} from '@angular/core'
import { NotecardsService } from 'src/services/notecards.service';
import { NotecardSet } from 'src/models/notecardset';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private notecardService:NotecardsService){}
  apiset: NotecardSet = {name: "", id: "", notecards: []};
  ngOnInit(){
    this.notecardService.getSet().subscribe((set: NotecardSet[])=>{
      console.log(set[0].name);

    })
   
  }
  title = 'NotesProject';
}
