import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: any;
  logout = false;
  userId: any;

  constructor( private router : Router, private fb: FormBuilder, private http: HttpService) { }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  redirectToRegister(){
    this.router.navigate(['auth/register']);
  }

  login(){
    this.http.login(this.loginFormGroup.value).subscribe((res : any) => {
      if(res.status){
        localStorage.setItem('userEmailId',this.loginFormGroup.value.email);
        localStorage.setItem('token', res.jwtToken);
        localStorage.setItem('UserName', res.displayName);
        localStorage.setItem('UserId', res.userId);
        this.router.navigate(['']);
        this.userId = localStorage.getItem('UserId');
        this.http.getUserProfileById(this.userId).subscribe((res : any) => {
          localStorage.setItem('profilePic',res.picture);
        })
      }
    });
  }

  get email(){
    return this.loginFormGroup.get('email');
  }

  get password(){
    return this.loginFormGroup.get('password');
  }
}
