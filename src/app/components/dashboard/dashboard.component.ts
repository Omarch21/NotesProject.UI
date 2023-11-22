import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  user : string | null = null
  private url = "authentication"
constructor(private authService: AuthService,private http: HttpClient,private _ngZone: NgZone,private router: Router){}
ngOnInit(){
  }
 
  testEndpoint(){
    this.authService.endpointTest().subscribe((text) =>{
      console.log(text);
    });
  }
  check(){
    this.authService.checkLoggedInUser().subscribe((text)=>{
      console.log(text);
   })
  }
  isUserLoggedIn(){
    this.authService.isUserLoggedIn().subscribe((text:boolean)=>{
      console.log(text);
    })
  }
  
  public logout(){
    console.log(localStorage.getItem("token"));
    this.authService.logout()
    this.router.navigate(['/'])
  console.log(localStorage.getItem("token"));
  }
}
