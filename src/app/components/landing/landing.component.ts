import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
constructor(private authService: AuthService){}

test(){
  this.authService.endpointTest().subscribe((a:any)=>{
    console.log(a);
  }
  )
}
}
