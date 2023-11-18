import { Component } from '@angular/core';
import { User } from 'src/models/user';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router:Router){}
user = new User();

login(user: User){
  console.log(user);
  this.authService.login(user).subscribe((token: string) =>{
localStorage.setItem('authToken',token);
console.log('good');
this.router.navigate(['/']);
  });
}
}
