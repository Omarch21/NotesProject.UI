import { Component,Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { RegisterUser } from 'src/models/registerUser';
import { AuthService } from 'src/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  user: RegisterUser = {email: '', password: '', fullName: '',userName: '', confirmPassword: ''}
register = new FormGroup({
  firstName : new FormControl('',Validators.required),
  lastName: new FormControl('',Validators.required),
  email: new FormControl('',[Validators.required,Validators.email]),
  password: new FormControl('',Validators.required),
  confirmPassword: new FormControl('',Validators.required)
})
passwordError: boolean = false;
constructor(private toastService: HotToastService,private authService: AuthService,private router: Router){

  
}
submitRegister(){
  var password = this.register.get('password')?.value;
  var confirmPassword = this.register.get('confirmPassword')?.value;

  if(this.register.valid){
    if(password === confirmPassword){
      this.passwordError = false;
      
      
 
      this.user.userName = this.register.get('email')?.value!;
      this.user.password = this.register.get('password')?.value!;
      this.user.confirmPassword = this.register.get('confirmPassword')?.value!;
      this.user.fullName = this.register.get('firstName')?.value!+" " +this.register.get('lastName')?.value!;
      this.user.email = this.register.get('email')?.value!;
      console.log(this.user);
      this.authService.register(this.user).subscribe(a=>{
        this.toastService.success(a.message); 
        this.router.navigate(['/login']);
      },
      error=>{
        this.toastService.error(error.error);
      })
      
      
    }
    else{
      this.passwordError = true;
      this.toastService.error('Passwords dont match')
    }
  }
}
}
